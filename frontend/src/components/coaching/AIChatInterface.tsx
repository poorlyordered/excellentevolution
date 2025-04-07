// frontend/src/components/coaching/AIChatInterface.tsx
'use client'; // Required for hooks

import React from 'react';
import { useAIRecommendations } from '@/hooks/useAIRecommendations'; // Adjust path if needed
import { Input } from '@/components/ui/input'; // Assuming Shadcn UI Input
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI Button
import { ScrollArea } from '@/components/ui/scroll-area'; // Assuming Shadcn UI ScrollArea
import { Send } from 'lucide-react'; // Icon

export function AIChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useAIRecommendations();
  // Ref for the ScrollArea root element
  const scrollAreaRef = React.useRef<React.ElementRef<typeof ScrollArea>>(null);

  // Scroll to bottom when new messages arrive
   React.useEffect(() => {
    // Find the viewport element within the ScrollArea root
    const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  return (
    <div className="flex flex-col h-[500px] border rounded-lg p-4 space-y-4 bg-background">
      {/* Pass the ref to the ScrollArea root */}
      <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && !isLoading && (
            <p className="text-center text-muted-foreground pt-4">
              Start chatting with Evo, your AI coach!
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-[85%] whitespace-pre-wrap ${ // Added whitespace-pre-wrap
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground' // Adjusted assistant style
                }`}
              >
                <span className="font-semibold capitalize block mb-1">{m.role === 'assistant' ? 'Evo' : 'You'}:</span> {/* Adjusted role display */}
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && ( // Show thinking indicator only when assistant is expected to reply
             <div className="flex justify-start">
               <div className="p-3 rounded-lg bg-muted text-muted-foreground animate-pulse">Evo is thinking...</div>
             </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 pt-2 border-t">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask Evo anything about your development..."
          disabled={isLoading}
          className="flex-grow"
          aria-label="Chat message input"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send message">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}