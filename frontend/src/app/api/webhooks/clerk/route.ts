import { Webhook, WebhookRequiredHeaders } from 'svix';
import { sendWelcomeEmail } from '@/emails/sendWelcomeEmail';
import { z } from 'zod';

// Environment variable validation
const EnvSchema = z.object({
  CLERK_WEBHOOK_SECRET: z.string().min(1, 'Webhook secret is required'),
});

// Validate environment variables
const validateEnv = () => {
  const parsed = EnvSchema.safeParse({
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
};

// Get validated environment variables
const env = validateEnv();

// Webhook event schema
const WebhookPayloadSchema = z.object({
  type: z.string(),
  data: z.object({
    email_addresses: z.array(z.object({
      email_address: z.string().email()
    })),
    first_name: z.string().optional(),
  }),
});

export async function POST(req: Request) {
  console.log('📥 Received webhook request');
  try {
    // Get and validate headers
    const rawHeaders = req.headers;
    const webhookHeaders = {
      'svix-id': rawHeaders.get('svix-id'),
      'svix-timestamp': rawHeaders.get('svix-timestamp'),
      'svix-signature': rawHeaders.get('svix-signature'),
    };

    // Validate required headers
    if (!webhookHeaders['svix-id'] || !webhookHeaders['svix-timestamp'] || !webhookHeaders['svix-signature']) {
      console.error('❌ Missing required webhook headers');
      return new Response('Missing required webhook headers', { status: 400 });
    }

    // Cast headers to required type after validation
    const validatedHeaders = webhookHeaders as WebhookRequiredHeaders;

    // Get and validate body
    const rawBody = await req.text();
    if (!rawBody) {
      console.error('❌ Empty webhook payload');
      return new Response('Empty webhook payload', { status: 400 });
    }

    // Create Svix instance and verify signature
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
    const payloadBytes = Buffer.from(rawBody);
    
    try {
      wh.verify(payloadBytes, validatedHeaders);
    } catch (err) {
      console.error('❌ Invalid webhook signature:', err);
      return new Response('Invalid webhook signature', { status: 401 });
    }

    // Parse and validate the webhook payload
    const payload = JSON.parse(rawBody);
    const validatedPayload = WebhookPayloadSchema.safeParse(payload);

    if (!validatedPayload.success) {
      console.error('❌ Invalid webhook payload:', validatedPayload.error);
      return new Response('Invalid webhook payload', { status: 400 });
    }

    const evt = validatedPayload.data;

    // Handle the webhook
    if (evt.type === 'user.created') {
      const { email_addresses, first_name } = evt.data;
      const primaryEmail = email_addresses[0]?.email_address;
      const username = first_name || 'there';

      if (primaryEmail) {
        try {
          await sendWelcomeEmail({
            email: primaryEmail,
            username,
          });
          console.log('✅ Welcome email sent successfully');
          return new Response('Welcome email sent successfully', { status: 200 });
        } catch (error) {
          console.error('❌ Error sending welcome email:', error);
          return new Response('Error sending welcome email', { status: 500 });
        }
      }
    }

    console.log('✅ Webhook processed successfully');
    return new Response('Webhook processed', { status: 200 });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
