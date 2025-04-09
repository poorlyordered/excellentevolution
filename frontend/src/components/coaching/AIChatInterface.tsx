// frontend/src/components/coaching/AIChatInterface.tsx
'use client'; // Required for hooks

import React from 'react';
import { useAIRecommendations } from '@/hooks/useAIRecommendations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, FileText } from 'lucide-react'; // Added FileText icon
import { analyzeLatestReview } from '@/actions/reviewActions'; // Import the new action
import { toast } from 'sonner'; // Import toast

export function AIChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useAIRecommendations();
  // Ref for the ScrollArea root element
  const scrollAreaRef = React.useRef<React.ElementRef<typeof ScrollArea>>(null);
  // State for review analysis
  const [analysisResult, setAnalysisResult] = React.useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisError, setAnalysisError] = React.useState<string | null>(null);

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

  // Handler for analyzing the latest review
  const handleAnalyzeReview = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);
    try {
      const result = await analyzeLatestReview();
      if (result.success) {
        setAnalysisResult(result.analysis ?? "No analysis returned.");
        toast.success("Review analysis complete.");
      } else {
        setAnalysisError(result.error ?? "Failed to analyze review.");
        toast.error(result.error ?? "Failed to analyze review.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      setAnalysisError(message);
      toast.error(`Analysis error: ${message}`);
      console.error("Analyze review exception:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  return (
    <div className="flex flex-col h-[700px] border rounded-lg p-4 space-y-4 bg-background"> {/* Increased height */}
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

      {/* Analysis Display Area */}
      {(isAnalyzing || analysisResult || analysisError) && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Quarterly Review Analysis</h3>
          {isAnalyzing && <p className="text-muted-foreground animate-pulse">Analyzing review...</p>}
          {analysisError && <p className="text-red-600">Error: {analysisError}</p>}
          {analysisResult && (
            <ScrollArea className="h-[150px] w-full rounded-md border p-3 bg-muted/50">
              <pre className="whitespace-pre-wrap text-sm">{analysisResult}</pre>
            </ScrollArea>
          )}
        </div>
      )}
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
        <Button
          type="button" // Important: prevent form submission
          variant="outline"
          onClick={handleAnalyzeReview}
          disabled={isLoading || isAnalyzing}
          size="icon"
          aria-label="Analyze latest review"
        >
          <FileText className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}