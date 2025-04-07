import { useState } from "react";
import { generateDevelopmentPlanMarkdown, refineWithAI } from "@/lib/markdown-generator";
import { useAssessments } from "@/hooks/useAssessments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";

export function DevelopmentPlanViewer() {
  const { user } = useUser();
  const { professionalContext, careerAspiration } = useAssessments();
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generatePlan = () => {
    const plan = generateDevelopmentPlanMarkdown({
      userName: user?.fullName || "User",
      professionalContext,
      careerAspiration
    });
    setMarkdown(plan);
  };

  const handleRefine = async () => {
    setIsLoading(true);
    try {
      const refined = await refineWithAI(markdown);
      setMarkdown(refined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving plan:", markdown);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={generatePlan}>Generate Plan</Button>
        <Button 
          variant="outline" 
          onClick={handleRefine}
          disabled={!markdown || isLoading}
        >
          {isLoading ? "Refining..." : "Refine with AI"}
        </Button>
        <Button 
          variant="secondary"
          onClick={handleSave}
          disabled={!markdown}
        >
          Save Plan
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