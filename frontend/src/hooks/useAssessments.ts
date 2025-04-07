import { useState } from "react";

type ProfessionalContext = {
  currentRole: string;
  experienceYears: number;
  keySkills: string;
  achievements: string;
};

type CareerAspiration = {
  shortTermGoals: string[];
  longTermGoals: string[];
  desiredRoles: string[];
  skillGaps: string[];
};

export function useAssessments() {
  const [professionalContext, setProfessionalContext] = useState<ProfessionalContext>({
    currentRole: "",
    experienceYears: 0,
    keySkills: "",
    achievements: ""
  });

  const [careerAspiration, setCareerAspiration] = useState<CareerAspiration>({
    shortTermGoals: [],
    longTermGoals: [],
    desiredRoles: [],
    skillGaps: []
  });

  return {
    professionalContext,
    setProfessionalContext,
    careerAspiration, 
    setCareerAspiration
  };
}