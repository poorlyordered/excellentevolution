import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAssessments } from "@/hooks/useAssessments";

export function CareerAspirationMapping() {
  const { careerAspiration, setCareerAspiration } = useAssessments();

  const addShortTermGoal = () => {
    setCareerAspiration({
      ...careerAspiration,
      shortTermGoals: [...careerAspiration.shortTermGoals, ""]
    });
  };

  const addLongTermGoal = () => {
    setCareerAspiration({
      ...careerAspiration,
      longTermGoals: [...careerAspiration.longTermGoals, ""]
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Short Term Goals (1-2 years)</Label>
        {careerAspiration.shortTermGoals.map((goal, index) => (
          <Input
            key={index}
            value={goal}
            onChange={(e) => {
              const newGoals = [...careerAspiration.shortTermGoals];
              newGoals[index] = e.target.value;
              setCareerAspiration({
                ...careerAspiration,
                shortTermGoals: newGoals
              });
            }}
          />
        ))}
        <Button variant="outline" onClick={addShortTermGoal}>
          Add Short Term Goal
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Long Term Goals (3-5+ years)</Label>
        {careerAspiration.longTermGoals.map((goal, index) => (
          <Input
            key={index}
            value={goal}
            onChange={(e) => {
              const newGoals = [...careerAspiration.longTermGoals];
              newGoals[index] = e.target.value;
              setCareerAspiration({
                ...careerAspiration,
                longTermGoals: newGoals
              });
            }}
          />
        ))}
        <Button variant="outline" onClick={addLongTermGoal}>
          Add Long Term Goal
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Desired Future Roles</Label>
        <Textarea
          value={careerAspiration.desiredRoles.join(", ")}
          onChange={(e) => 
            setCareerAspiration({
              ...careerAspiration,
              desiredRoles: e.target.value.split(", ")
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Identified Skill Gaps</Label>
        <Textarea
          value={careerAspiration.skillGaps.join(", ")}
          onChange={(e) => 
            setCareerAspiration({
              ...careerAspiration,
              skillGaps: e.target.value.split(", ")
            })
          }
        />
      </div>

      <Button className="w-full">
        Save and Continue
      </Button>
    </div>
  );
}