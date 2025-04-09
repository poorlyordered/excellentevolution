// frontend/src/app/api/ai/refine-plan/route.ts
import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Define the expected request body schema
const RefineRequestSchema = z.object({
  planContent: z.string().min(10, 'Plan content must be at least 10 characters long.'),
});

// Initialize the Anthropic provider (ensure ANTHROPIC_API_KEY is set in .env)
const anthropic = createAnthropic();

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const validated = RefineRequestSchema.safeParse(json);

    if (!validated.success) {
      return new Response(JSON.stringify({ error: 'Invalid request body', details: validated.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { planContent } = validated.data;

    // Construct the prompt for the AI
    const systemPrompt = `You are an expert career development coach AI. Your task is to refine the following professional development plan provided by the user. Focus on clarity, actionability, and alignment with best practices. Improve the structure, wording, and suggest concrete, measurable steps where appropriate. Do not add conversational filler; return only the refined Markdown plan.`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'), // Use the specified model
      system: systemPrompt,
      prompt: `Refine this development plan:\n\n---\n\n${planContent}`,
      // Optional: Add temperature, max_tokens etc. if needed
      // temperature: 0.7,
    });

    // Respond with the stream
    return result.toDataStreamResponse(); // Corrected method name

  } catch (error: unknown) {
    console.error("Error in /api/ai/refine-plan:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(JSON.stringify({ error: 'Failed to process refinement request.', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}