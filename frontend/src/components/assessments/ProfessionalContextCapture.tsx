import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAssessments } from "@/hooks/useAssessments";

export function ProfessionalContextCapture() {
  const { professionalContext, setProfessionalContext } = useAssessments();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentRole">Current Role</Label>
        <Input
          id="currentRole"
          value={professionalContext.currentRole}
          onChange={(e) => 
            setProfessionalContext({
              ...professionalContext,
              currentRole: e.target.value
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experienceYears">Years of Experience</Label>
        <Input
          id="experienceYears"
          type="number"
          value={professionalContext.experienceYears}
          onChange={(e) => 
            setProfessionalContext({
              ...professionalContext,
              experienceYears: parseInt(e.target.value)
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keySkills">Key Skills</Label>
        <Textarea
          id="keySkills"
          value={professionalContext.keySkills}
          onChange={(e) => 
            setProfessionalContext({
              ...professionalContext,
              keySkills: e.target.value
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="achievements">Notable Achievements</Label>
        <Textarea
          id="achievements"
          value={professionalContext.achievements}
          onChange={(e) => 
            setProfessionalContext({
              ...professionalContext,
              achievements: e.target.value
            })
          }
        />
      </div>

      <Button 
        className="w-full"
        onClick={() => console.log('Saving professional context')}
      >
        Save and Continue
      </Button>
    </div>
  );
}