import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  username: string;
}

export const WelcomeEmail = ({ username }: WelcomeEmailProps) => {
  const previewText = `Welcome to Excellent Evolution, ${username}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Excellent Evolution!</Heading>
          <Text style={text}>Hi {username},</Text>
          <Text style={text}>
            We&apos;re thrilled to have you join our platform. Excellent Evolution is designed to help you achieve your professional development goals through personalized assessments and coaching.
          </Text>
          <Text style={text}>Here&apos;s what you can do to get started:</Text>
          <Text style={list}>
            • Complete your first assessment<br />
            • Schedule a coaching session<br />
            • Set up your development goals<br />
            • Explore your personalized dashboard
          </Text>
          <Text style={text}>
            If you have any questions, our support team is here to help. Just reply to this email.
          </Text>
          <Text style={text}>
            Best regards,<br />
            The Excellent Evolution Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '48px 0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const list = {
  ...text,
  margin: '24px 0',
  paddingLeft: '24px',
};

export default WelcomeEmail;
