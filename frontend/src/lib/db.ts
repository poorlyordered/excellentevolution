import { prisma } from './prisma';

// Define basic types based on our schema
interface User {
  id: string;
  email: string;
  name?: string | null;
  role: 'CLIENT' | 'COACH' | 'ADMIN';
  createdAt: Date;
  lastLogin?: Date | null;
  isActive: boolean;
  assessments?: Assessment[];
}

// Define specific types for each assessment's raw results
interface MBTIResults {
  type: string;
  scores: {
    extraversion: number;
    introversion: number;
    sensing: number;
    intuition: number;
    thinking: number;
    feeling: number;
    judging: number;
    perceiving: number;
  };
}

interface EnneagramResults {
  type: number;
  wing: number;
  scores: Record<number, number>; // scores for each type 1-9
}

interface StrengthsFinderResults {
  strengths: string[];
  scores: Record<string, number>;
}

export type AssessmentResults = {
  MBTI: MBTIResults;
  Enneagram: EnneagramResults;
  StrengthsFinder: StrengthsFinderResults;
};

export type AssessmentType = keyof AssessmentResults;

interface Assessment {
  id: string;
  userId: string;
  type: AssessmentType;
  rawResults: AssessmentResults[AssessmentType];
  processedInsights: string[];
  createdAt: Date;
  user?: User;
}

// User operations
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
    include: { assessments: true }
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
    include: { assessments: true }
  });
}

export async function createUser(data: {
  email: string;
  name?: string;
  role?: 'CLIENT' | 'COACH' | 'ADMIN';
}): Promise<User> {
  return prisma.user.create({
    data: {
      ...data,
      role: data.role || 'CLIENT'
    },
    include: { assessments: true }
  });
}

export async function updateUser(
  id: string,
  data: Partial<Omit<User, 'id' | 'createdAt' | 'assessments'>>
): Promise<User> {
  return prisma.user.update({
    where: { id },
    data,
    include: { assessments: true }
  });
}

// Assessment operations
export async function getAssessmentById(id: string): Promise<Assessment | null> {
  return prisma.assessment.findUnique({
    where: { id },
    include: { user: true }
  });
}

export async function getUserAssessments(userId: string): Promise<Assessment[]> {
  return prisma.assessment.findMany({
    where: { userId },
    include: { user: true }
  });
}

export async function createAssessment<T extends AssessmentType>(data: {
  userId: string;
  type: T;
  rawResults: AssessmentResults[T];
  processedInsights: string[];
}): Promise<Assessment> {
  return prisma.assessment.create({
    data,
    include: { user: true }
  });
}

export async function updateAssessment<T extends AssessmentType>(
  id: string,
  data: Partial<{
    type: T;
    rawResults: AssessmentResults[T];
    processedInsights: string[];
  }>
): Promise<Assessment> {
  return prisma.assessment.update({
    where: { id },
    data,
    include: { user: true }
  });
}

// Error handling wrapper
export async function withErrorHandling<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      throw new Error('A unique constraint would be violated.');
    }
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      throw new Error('Record not found.');
    }
    throw error;
  }
}
