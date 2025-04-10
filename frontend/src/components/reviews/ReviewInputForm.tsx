// frontend/src/components/reviews/ReviewInputForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createOrUpdateQuarterlyReview } from '@/actions/reviewActions'; // Import the action
import { toast } from 'sonner';

// Define the form schema using Zod, matching the Server Action input
// Note: We don't include reviewId here as the form is for creating/updating based on context,
// or we'd need a way to pass the ID if editing an existing specific review.
// For simplicity, this form currently focuses on creating a new review or updating the latest implicitly.
// A more robust implementation might require passing an optional reviewId prop.
const FormSchema = z.object({
  content: z.string().min(10, "Review content must be at least 10 characters."),
  // reviewDate could be added here if needed, potentially using a date picker component
});

type FormData = z.infer<typeof FormSchema>;

// Optional prop to handle successful submission if needed by parent
interface ReviewInputFormProps {
  onReviewSaved?: (reviewId: string) => void;
  // reviewToEdit?: { id: string; content: string; reviewDate?: Date }; // Add this to enable editing mode
}

export function ReviewInputForm({ onReviewSaved }: ReviewInputFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    // defaultValues: { // Use this if implementing edit mode
    //   content: reviewToEdit?.content || '',
    // },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      // For now, this always creates a new review or updates the latest implicitly if the action logic supports it.
      // To explicitly update, we'd need to pass reviewToEdit.id to the action.
      const result = await createOrUpdateQuarterlyReview({
        content: data.content,
        // reviewId: reviewToEdit?.id // Pass ID if editing
      });

      if (result.success && result.review) {
        toast.success('Quarterly review saved successfully!');
        reset(); // Clear the form
        if (onReviewSaved) {
          onReviewSaved(result.review.id); // Notify parent if needed
        }
      } else {
        toast.error(result.error || 'Failed to save review.');
        console.error('Save review error:', result.error, result.details);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error('Save review exception:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Add/Update Quarterly Review</h3>
      <div className="space-y-2">
        <Label htmlFor="reviewContent" className="text-gray-900">Review Content</Label>
        <Textarea
          id="reviewContent"
          placeholder="Enter the details of your quarterly review..."
          className="min-h-[150px] text-gray-900 placeholder-gray-500"
          {...register('content')}
          disabled={isLoading}
        />
        {errors.content && <p className="text-sm text-red-600">{errors.content.message}</p>}
      </div>
      {/* Add Date Picker here if implementing reviewDate input */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Review'}
      </Button>
    </form>
  );
}