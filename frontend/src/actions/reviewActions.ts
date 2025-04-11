// frontend/src/actions/reviewActions.ts
'use server';

/**
 * TODO: Replace with Stack Auth session retrieval logic.
 * Example: import { getStackAuthSession } from "@/lib/stack-auth";
 */
type Session = { user: { id: string } } | null;
import { prisma } from '../../../lib/prisma';
import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { z } from 'zod'; // Import Zod
import { revalidatePath } from 'next/cache'; // Import revalidatePath
import type { JsonValue } from '@prisma/client/runtime/library'; // Import JsonValue type

// Initialize Anthropic provider
const anthropic = createAnthropic();

// --- Zod Schema for Review Input ---
const ReviewInputSchema = z.object({
  reviewId: z.string().uuid().optional(), // Optional: Provide ID to update
  content: z.string().min(10, "Review content must be at least 10 characters."),
  reviewDate: z.date().optional(), // Optional: Allow specifying date, default to now()
});
/**
 * Fetches the latest quarterly review, development plan, and assessment context,
 * then calls an AI model to analyze the review in light of the context.
 * Returns the full analysis text.
 */
export async function analyzeLatestReview() {
  // --- 1. Authentication ---
  // TODO: Replace with Stack Auth session retrieval
  const session = null as Session; // await getStackAuthSession();
  const userId = session?.user?.id;
  if (!userId) {
    // Cannot return NextResponse directly from Server Action, throw error instead
    // Throwing might not be ideal if we want to return structured errors.
    // Let's return a structured error object.
    return { success: false, error: 'Unauthorized: User not logged in.' };
  }

  // --- 2. Fetch Data ---
  let reviewContent = "No quarterly review found.";
  let planContext = "No development plan found.";
  let assessmentContext = "No assessment insights found.";

  try {
    // Fetch latest review
    const latestReview = await prisma.quarterlyReview.findFirst({
      where: { userId: userId },
      orderBy: { reviewDate: 'desc' },
    });
    if (latestReview) {
      reviewContent = latestReview.content;
    }

    // Fetch latest plan
    const latestPlan = await prisma.developmentPlan.findFirst({
      where: { userId: userId },
      orderBy: { updatedAt: 'desc' },
    });
    if (latestPlan) {
      planContext = `Latest Development Plan (Summary):\n${latestPlan.content.substring(0, 500)}...`;
    }

    // Fetch assessments
    const assessments = await prisma.assessment.findMany({
      where: { userId: userId },
      select: { type: true, processedInsights: true },
    });
    if (assessments.length > 0) {
      assessmentContext = "Assessment Insights:\n";
      // Define local type as workaround for persistent import issues
      // Workaround type due to persistent Prisma type import issues
      type AssessmentContext = { type: string; processedInsights: JsonValue | null }; // Use imported JsonValue
      assessments.forEach((assessment: AssessmentContext) => { // Use local type
        let insights = "No insights processed.";
        if (assessment.processedInsights) {
           try {
              insights = typeof assessment.processedInsights === 'object'
                  ? JSON.stringify(assessment.processedInsights)
                  : String(assessment.processedInsights);
           } catch { insights = "Could not parse insights."; }
        }
        assessmentContext += `- ${assessment.type}: ${insights.substring(0, 200)}...\n`;
      });
    }

  } catch (dbError) {
    console.error("Error fetching data for review analysis:", dbError);
    // Allow analysis to proceed but indicate data fetching failed
    // Return structured error instead of proceeding with partial context
    const message = dbError instanceof Error ? dbError.message : "Unknown database error.";
    return { success: false, error: `Failed to fetch context data: ${message}` };
  }

  // Check if we actually found a review to analyze
  if (reviewContent === "No quarterly review found.") {
      return { success: false, error: "No quarterly review found in the database to analyze." };
  }


  // --- 3. Construct Prompt ---
  const systemPrompt = `You are an expert AI Professional Development Coach named 'Evo'.
Analyze the user's latest Quarterly Review provided below in the context of their Development Plan and Assessment Insights.
Focus on:
- Alignment between review feedback and development plan goals.
- Progress made on plan objectives based on the review.
- Potential areas for adjustment in the development plan based on the review.
- Actionable suggestions for the next quarter.
Provide a concise, structured analysis using Markdown formatting.`;

  const userPrompt = `## Latest Quarterly Review:\n${reviewContent}\n\n## Context:\n${planContext}\n${assessmentContext}\n\n## Analysis Request:\nPlease analyze my review based on the provided context.`;

  // --- 4. Call AI & Return Full Text ---
  try {
    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: 1500,
    });

     // Use the textStream helper to get the full text
     let fullText = "";
     for await (const textChunk of result.textStream) {
        fullText += textChunk;
     }
     return { success: true, analysis: fullText };


  } catch (aiError) {
    console.error("Error calling AI for review analysis:", aiError);
    const message = aiError instanceof Error ? aiError.message : "Unknown AI error.";
     return { success: false, error: `AI analysis failed: ${message}` };
  }
}


/**
 * Creates a new quarterly review or updates an existing one for the authenticated user.
 */
export async function createOrUpdateQuarterlyReview(input: z.infer<typeof ReviewInputSchema>) {
  // --- Authentication ---
  // TODO: Replace with Stack Auth session retrieval
  const session = null as Session; // await getStackAuthSession();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, error: 'Unauthorized: User not logged in.' };
  }

  // --- Validation ---
  const validatedInput = ReviewInputSchema.safeParse(input);
  if (!validatedInput.success) {
    return { success: false, error: 'Invalid input.', details: validatedInput.error.flatten() };
  }

  const { reviewId, content, reviewDate } = validatedInput.data;

  // --- Database Operation ---
  try {
    let savedReview;
    if (reviewId) {
      // Update existing review - Ensure user owns it first
      const existingReview = await prisma.quarterlyReview.findUnique({
        where: { id: reviewId },
      });

      if (!existingReview || existingReview.userId !== userId) {
        return { success: false, error: 'Unauthorized: Review not found or user does not own this review.' };
      }

      savedReview = await prisma.quarterlyReview.update({
        where: { id: reviewId },
        data: {
          content: content,
          reviewDate: reviewDate ?? existingReview.reviewDate, // Keep existing date if not provided
        },
      });
      console.log(`Quarterly review updated: ${savedReview.id} for user: ${userId}`);
    } else {
      // Create new review
      savedReview = await prisma.quarterlyReview.create({
        data: {
          userId: userId,
          content: content,
          reviewDate: reviewDate ?? new Date(), // Default to now if not provided
        },
      });
      console.log(`Quarterly review created: ${savedReview.id} for user: ${userId}`);
    }

    // Revalidate paths that might display review data or analysis
    revalidatePath('/dashboard'); // Example path
    // Consider revalidating paths related to the AI chat/analysis if it uses this data directly

    return { success: true, review: savedReview };
  } catch (error) {
    console.error("Error saving quarterly review:", error);
    const message = error instanceof Error ? error.message : "Database error: Failed to save review.";
    return { success: false, error: message };
  }
}