// frontend/src/app/(coaching)/chat/page.tsx
import { AIChatInterface } from '@/components/coaching/AIChatInterface'; // Adjust path if needed

export default function CoachingChatPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AI Coaching Chat</h1>
      <AIChatInterface />
    </div>
  );
}