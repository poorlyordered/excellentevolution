import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailTemplate = {
  subject: string;
  react: React.ReactElement;
};

export type SendEmailParams = {
  to: string;
  template: EmailTemplate;
};

export async function sendEmail({ to, template }: SendEmailParams) {
  try {
    const { subject, react } = template;
    
    const data = await resend.emails.send({
      from: 'Excellent Evolution <no-reply@excellentevolution.com>',
      to: [to],
      subject: subject,
      react: react,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
