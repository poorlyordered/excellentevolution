// frontend/src/app/api/ai/chat/route.ts
import { xai } from '@ai-sdk/xai';
import { streamText, CoreMessage } from 'ai'; // Import CoreMessage
import { NextResponse } from 'next/server';
/**
 * TODO: Replace with Stack Auth session retrieval logic.
 * Example: import { getStackAuthSession } from "@/lib/stack-auth";
 */
type Session = { user: { id: string } } | null;
import { prisma } from '@/lib/prisma';
 // AssessmentType import removed; use string for type

// No explicit initialization needed for xai (Grok 3 Mini Beta)

// IMPORTANT: Set the runtime to edge
export const runtime = 'edge';

// Define a system prompt for the AI Coach
const baseSystemPrompt = `You are an expert AI Professional Development Coach named 'Evo'.
Your goal is to provide insightful, supportive, and actionable career advice based on user inputs and the provided context (assessment results, development plans).
Be encouraging, ask clarifying questions when needed, and help users reflect on their goals and progress.
Reference the user's context (assessments, plans) when relevant, but maintain a conversational tone.
Keep responses concise and focused unless asked for detailed explanations.`;

export async function POST(req: Request) {
  try {
    // --- 1. Authentication ---
    // TODO: Replace with Stack Auth session retrieval
    const session = null as Session; // await getStackAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    // --- 2. Parse Request Body ---
    const { messages }: { messages: CoreMessage[] } = await req.json(); // Type messages

    // --- 3. Fetch User Context ---
    let userContext = "";
    try {
      // Fetch latest development plan
      const latestPlan = await prisma.developmentPlan.findFirst({
        where: { userId: userId },
        orderBy: { updatedAt: 'desc' },
      });
      if (latestPlan) {
        userContext += `\n\n## Latest Development Plan (Summary):\n${latestPlan.content.substring(0, 500)}...\n`; // Add a summary
      }

      // Fetch assessment insights (example: fetching all for simplicity, might need refinement)
      const assessments = await prisma.assessment.findMany({
        where: { userId: userId },
        select: { type: true, processedInsights: true }, // Select only needed fields
      });
      if (assessments.length > 0) {
        userContext += "\n## Assessment Insights:\n";
        assessments.forEach((assessment: { type: string; processedInsights: unknown | null }) => { // Use string for type and unknown for JSON
          // Safely access processedInsights, assuming it's JSON or stringifiable
          let insights = "No insights processed.";
          if (assessment.processedInsights) {
             try {
                // Attempt to stringify if it's an object, otherwise use as is if string
                insights = typeof assessment.processedInsights === 'object'
                    ? JSON.stringify(assessment.processedInsights)
                    : String(assessment.processedInsights);
             } catch {
                insights = "Could not parse insights.";
             }
          }
          userContext += `- ${assessment.type}: ${insights.substring(0, 200)}...\n`; // Add summaries
        });
      }
    } catch (dbError) {
      console.error("Error fetching user context:", dbError);
      // Proceed without context, or return an error depending on requirements
      userContext = "\n\n[Note: Could not retrieve user context due to an error.]";
    }

    // --- 4. Construct Final System Prompt ---
    const finalSystemPrompt = `${baseSystemPrompt}\n\n## User Context:${userContext || "\nNo specific context available."}`;


    // --- 5. Call AI ---
    const result = await streamText({
      model: xai('x-ai/grok-3-mini-beta'), // Switched to Grok 3 Mini Beta via Vercel AI SDK
      system: finalSystemPrompt, // Pass augmented system prompt
      messages: messages,
      maxTokens: 1024,
    });

    // Convert the result stream to a StreamingTextResponse
    return result.toTextStreamResponse(); // Correct method for text streaming

  } catch (error: unknown) { // Explicitly type error as unknown
    console.error("Error in AI chat route:", error);
    // Handle specific API errors (Grok 3 Mini Beta does not use Anthropic APIError)
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