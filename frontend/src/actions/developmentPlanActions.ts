// frontend/src/actions/developmentPlanActions.ts
'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server'; // Use server-side auth
import { prisma } from '@/lib/prisma'; // Correct path based on file structure
import { revalidatePath } from 'next/cache';

// --- Input Schemas ---

const PlanInputSchema = z.object({
  planId: z.string().uuid().optional(), // Optional: Provide ID to update
  title: z.string().min(1, "Title cannot be empty").optional(), // Optional title
  content: z.string().min(1, "Plan content cannot be empty"),
});

const GetPlanByIdSchema = z.object({
    planId: z.string().uuid(),
});


// --- Server Actions ---

/**
 * Creates a new development plan or updates an existing one for the authenticated user.
 */
export async function createOrUpdateDevelopmentPlan(input: z.infer<typeof PlanInputSchema>) {
  const { userId } = await auth(); // Added await
  if (!userId) {
    return { success: false, error: 'Unauthorized: User not logged in.' };
  }

  const validatedInput = PlanInputSchema.safeParse(input);
  if (!validatedInput.success) {
    return { success: false, error: 'Invalid input.', details: validatedInput.error.flatten() };
  }

  const { planId, title, content } = validatedInput.data;

  try {
    let savedPlan;
    if (planId) {
      // Update existing plan - Ensure user owns it first
      const existingPlan = await prisma.developmentPlan.findUnique({
        where: { id: planId },
      });

      if (!existingPlan || existingPlan.userId !== userId) {
        return { success: false, error: 'Unauthorized: Plan not found or user does not own this plan.' };
      }

      savedPlan = await prisma.developmentPlan.update({
        where: { id: planId },
        data: {
          title: title ?? existingPlan.title, // Keep existing title if new one not provided
          content: content,
        },
      });
      console.log(`Development plan updated: ${savedPlan.id} for user: ${userId}`);
    } else {
      // Create new plan
      savedPlan = await prisma.developmentPlan.create({
        data: {
          userId: userId,
          title: title,
          content: content,
        },
      });
      console.log(`Development plan created: ${savedPlan.id} for user: ${userId}`);
    }

    // Revalidate relevant paths
    revalidatePath('/dashboard'); // Revalidate dashboard after save/update
    if (savedPlan.id) {
      revalidatePath(`/dashboard/plans/${savedPlan.id}`); // Revalidate specific plan page if ID exists
    }
    // revalidatePath(`/dashboard/plans/${savedPlan.id}`);

    return { success: true, plan: savedPlan };
  } catch (error) { // Changed 'any'
    console.error("Error in createOrUpdateDevelopmentPlan:", error);
    const errorMessage = error instanceof Error ? error.message : 'Database error: Failed to save development plan.';
    return { success: false, error: errorMessage };
  }
}

/**
 * Retrieves all development plans for the authenticated user.
 */
export async function getDevelopmentPlans() {
  const { userId } = await auth(); // Added await
  if (!userId) {
    return { success: false, error: 'Unauthorized: User not logged in.', plans: [] };
  }

  try {
    const plans = await prisma.developmentPlan.findMany({
      where: { userId: userId },
      orderBy: { updatedAt: 'desc' }, // Order by most recently updated
    });
    return { success: true, plans: plans };
  } catch (error) { // Changed 'any'
    console.error("Error in getDevelopmentPlans:", error);
    const errorMessage = error instanceof Error ? error.message : 'Database error: Failed to retrieve development plans.';
    return { success: false, error: errorMessage, plans: [] };
  }
}

/**
 * Retrieves a specific development plan by its ID for the authenticated user.
 */
export async function getDevelopmentPlanById(input: z.infer<typeof GetPlanByIdSchema>) {
    const { userId } = await auth(); // Added await
    if (!userId) {
        return { success: false, error: 'Unauthorized: User not logged in.' };
    }

    const validatedInput = GetPlanByIdSchema.safeParse(input);
    if (!validatedInput.success) {
        return { success: false, error: 'Invalid input.', details: validatedInput.error.flatten() };
    }

    const { planId } = validatedInput.data;

    try {
        const plan = await prisma.developmentPlan.findUnique({
            where: { id: planId },
        });

        // Verify ownership
        if (!plan || plan.userId !== userId) {
            return { success: false, error: 'Unauthorized: Plan not found or user does not own this plan.' };
        }

        return { success: true, plan: plan };
    } catch (error) { // Changed 'any'
        console.error("Error in getDevelopmentPlanById:", error);
        const errorMessage = error instanceof Error ? error.message : 'Database error: Failed to retrieve development plan.';
        return { success: false, error: errorMessage };
    }
}