import { useState } from "react";
import { generateDevelopmentPlanMarkdown } from "@/lib/markdown-generator";
import { useAssessments } from "@/hooks/useAssessments"; // Assuming this hook exists
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { createOrUpdateDevelopmentPlan } from "@/actions/developmentPlanActions"; // Import the server action
import { toast } from "sonner"; // Import toast for notifications
export function DevelopmentPlanViewer() {
  const { user } = useUser();
  const { professionalContext, careerAspiration } = useAssessments();
  const [markdown, setMarkdown] = useState("");
  const [isLoadingRefine, setIsLoadingRefine] = useState(false); // Renamed for clarity
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null); // State for current plan ID

  // TODO: Add logic here or in parent component to load an existing plan
  // using getDevelopmentPlanById and setMarkdown/setCurrentPlanId if needed.
  // For now, this component only handles generating/saving new plans.
  const generatePlan = () => {
    const plan = generateDevelopmentPlanMarkdown({
      userName: user?.fullName || "User",
      professionalContext,
      careerAspiration
    });
    setMarkdown(plan);
  };

  const handleRefine = async () => {
    if (!markdown) {
      toast.warning("Plan content is empty.");
      return;
    }
    setIsLoadingRefine(true);
    setMarkdown(""); // Clear existing markdown before streaming new content

    try {
      const response = await fetch('/api/ai/refine-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planContent: markdown }),
      });

      if (!response.ok) {
        // Try to parse error from response body
        let errorDetails = "Unknown error";
        try {
          const errorJson = await response.json();
          errorDetails = errorJson.error || errorJson.details || JSON.stringify(errorJson);
        } catch { // Removed unused parseError variable
          // If parsing fails, use status text
          errorDetails = response.statusText;
        }
        throw new Error(`API Error (${response.status}): ${errorDetails}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      // Process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMarkdown((prev) => prev + chunk); // Append chunk to state
        }
      }
      toast.success("Plan refined successfully!");

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during refinement.";
      toast.error(`Refinement failed: ${errorMessage}`);
      console.error("Refine error:", error);
      // Optionally restore the original markdown if refinement fails completely
      // setMarkdown(originalMarkdown); // Need to store original markdown if this is desired
    } finally {
      setIsLoadingRefine(false);
    }
  };

  const handleSave = async () => {
    if (!markdown) {
      toast.warning("Plan content is empty.");
      return;
    }
    setIsLoadingSave(true);
    try {
      const result = await createOrUpdateDevelopmentPlan({
        planId: currentPlanId ?? undefined, // Pass ID if it exists (update), otherwise undefined (create)
        content: markdown,
        // title: "My Development Plan" // Optional: Add title input later
      });

      if (result.success && result.plan) {
        setCurrentPlanId(result.plan.id); // Store the ID after successful save/update
        toast.success(`Plan ${currentPlanId ? 'updated' : 'saved'} successfully!`);
      } else {
        toast.error(result.error || "Failed to save plan.");
        console.error("Save error:", result.error, result.details);
      }
    } catch (error) {
        toast.error("An unexpected error occurred while saving.");
        console.error("Save exception:", error);
    } finally {
      setIsLoadingSave(false);
    }
  };

  const exportMarkdownToFile = () => {
    if (!markdown) {
      toast.warning("Plan content is empty.");
      return;
    }
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    // TODO: Use plan title or a default name if title isn't implemented yet
    link.setAttribute('download', 'development-plan.md');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.info("Plan exported as development-plan.md");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={generatePlan}>Generate Plan</Button>
        <Button 
          variant="outline" 
          onClick={handleRefine}
          disabled={!markdown || isLoadingRefine || isLoadingSave} // Disable if refining or saving
        >
          {isLoadingRefine ? "Refining..." : "Refine with AI"}
        </Button>
        <Button
          variant="outline"
          onClick={exportMarkdownToFile}
          disabled={!markdown || isLoadingSave || isLoadingRefine}
        >
          Export Plan
        </Button>
        <Button 
          variant="secondary"
          onClick={handleSave}
          disabled={!markdown || isLoadingSave || isLoadingRefine} // Disable if saving or refining
        >
          {isLoadingSave ? "Saving..." : (currentPlanId ? "Update Plan" : "Save Plan")}
        </Button>
      </div>

      <Textarea
        className="min-h-[500px] font-mono text-sm"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Your development plan will appear here..."
      />
    </div>
  );
}