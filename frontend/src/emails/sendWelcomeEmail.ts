import { WelcomeEmail } from './WelcomeEmail';
import { sendEmail } from '../lib/email';

interface SendWelcomeEmailParams {
  email: string;
  username: string;
}

export async function sendWelcomeEmail({ email, username }: SendWelcomeEmailParams) {
  return sendEmail({
    to: email,
    template: {
      subject: 'Welcome to Excellent Evolution!',
      react: WelcomeEmail({ username }),
    },
  });
}
