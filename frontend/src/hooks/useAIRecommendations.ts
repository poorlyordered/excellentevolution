// frontend/src/hooks/useAIRecommendations.ts
import { useChat } from 'ai/react';
import { toast } from 'sonner'; // Assuming sonner is used for notifications

export function useAIRecommendations() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/ai/chat', // We'll need to create this API route later
    onError: (err) => {
      console.error("AI Chat Error:", err);
      toast.error('Error communicating with AI assistant. Please try again.');
    },
    // You can add initialMessages or other options here if needed
  });

  // Add any specific logic for coaching recommendations here later
  // For example, functions to trigger specific types of advice or analysis

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    // Expose custom functions here
  };
}