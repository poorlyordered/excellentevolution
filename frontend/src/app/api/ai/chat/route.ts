// frontend/src/app/api/ai/chat/route.ts
import { Anthropic } from '@anthropic-ai/sdk'; // Re-import for error type checking
import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

// Initialize the Anthropic provider instance
const anthropic = createAnthropic({
  // apiKey is read automatically from ANTHROPIC_API_KEY env var by default
  // apiKey: process.env.ANTHROPIC_API_KEY, // Optional: Explicitly pass if needed
});

// IMPORTANT: Set the runtime to edge
export const runtime = 'edge';

// Define a system prompt for the AI Coach
const systemPrompt = `You are an expert AI Professional Development Coach named 'Evo'.
Your goal is to provide insightful, supportive, and actionable career advice based on user inputs, assessment results, and development plans.
Be encouraging, ask clarifying questions when needed, and help users reflect on their goals and progress.
Reference the user's context (assessments, plans) when relevant, but maintain a conversational tone.
Keep responses concise and focused unless asked for detailed explanations.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Use streamText with the Anthropic provider
    const result = await streamText({
      // Model selection - Use the appropriate Sonnet 3.x model available
      // Check Anthropic documentation or Vercel AI SDK for the latest model names
      // Example: 'claude-3-sonnet-20240229'
      model: anthropic('claude-3-sonnet-20240229'), // Use the provider instance directly
      system: systemPrompt, // Pass system prompt directly
      messages: messages, // Pass user/assistant messages
      maxTokens: 1024, // Renamed parameter
    });

    // Convert the result stream to a StreamingTextResponse
    return result.toTextStreamResponse();

  } catch (error: unknown) { // Explicitly type error as unknown
    console.error("Error in AI chat route:", error);
    // Handle specific Anthropic API errors
    if (error instanceof Anthropic.APIError) {
      console.error(`Anthropic API Error: ${error.status} ${error.name}`, error);
      return NextResponse.json({ error: `AI Service Error: ${error.message}` }, { status: error.status });
    }
    // Handle generic errors
    if (error instanceof Error) {
        console.error("Generic Error:", error);
        return NextResponse.json({ error: `An internal server error occurred: ${error.message}` }, { status: 500 });
    }
    // Handle cases where error is not an Error instance
    console.error("Unknown Error Type:", error);
    return NextResponse.json({ error: 'An unexpected internal server error occurred.' }, { status: 500 });
  }
}