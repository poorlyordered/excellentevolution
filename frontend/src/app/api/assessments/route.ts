import { NextRequest, NextResponse } from 'next/server';
import { createAssessment, getUserAssessments, withErrorHandling } from '@/lib/db';
import { AssessmentType } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, rawResults, processedInsights } = body;

    if (!userId || !type || !rawResults) {
      return NextResponse.json(
        { error: 'userId, type, and rawResults are required' },
        { status: 400 }
      );
    }

    // Validate assessment type
    if (![AssessmentType.MBTI, AssessmentType.Enneagram, AssessmentType.StrengthsFinder, AssessmentType.BIG_FIVE].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid assessment type' },
        { status: 400 }
      );
    }

    // Validate raw results structure based on assessment type
    const validationError = validateRawResults(type as AssessmentType, rawResults);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    const assessment = await withErrorHandling(async () => {
      return createAssessment({
        userId,
        type: type as AssessmentType,
        rawResults,
        processedInsights: processedInsights || [],
      });
    });

    return NextResponse.json(assessment);
  } catch (error) {
    console.error('Error creating assessment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter is required' },
        { status: 400 }
      );
    }

    const assessments = await withErrorHandling(async () => {
      return getUserAssessments(userId);
    });

    return NextResponse.json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to validate raw results structure
function validateRawResults(type: AssessmentType, rawResults: unknown): string | null {
  try {
    switch (type) {
      case AssessmentType.MBTI: {
        const results = rawResults as { scores?: Record<string, number>; type?: unknown };
        const { scores, type: mbtiType } = results;
        if (!scores || !mbtiType || typeof mbtiType !== 'string') {
          return 'Invalid MBTI results structure';
        }
        const requiredScores = [
          'extraversion', 'introversion', 'sensing', 'intuition',
          'thinking', 'feeling', 'judging', 'perceiving'
        ];
        if (!requiredScores.every(score => typeof scores[score] === 'number')) {
          return 'Invalid MBTI scores structure';
        }
        break;
      }
      case AssessmentType.Enneagram: {
        const results = rawResults as { type?: number; wing?: number; scores?: Record<number, number> };
        const { type: enneagramType, wing, scores } = results;
        if (
          typeof enneagramType !== 'number' ||
          typeof wing !== 'number' ||
          !scores ||
          typeof scores !== 'object'
        ) {
          return 'Invalid Enneagram results structure';
        }
        if (
          enneagramType < 1 || enneagramType > 9 ||
          wing < 1 || wing > 9
        ) {
          return 'Invalid Enneagram type or wing number';
        }
        break;
      }
      case AssessmentType.StrengthsFinder: {
        const results = rawResults as { strengths?: string[]; scores?: Record<string, number> };
        const { strengths, scores } = results;
        if (
          !Array.isArray(strengths) ||
          !scores ||
          typeof scores !== 'object'
        ) {
          return 'Invalid StrengthsFinder results structure';
        }
        if (!strengths.every(s => typeof s === 'string')) {
          return 'Invalid strengths format';
        }
        break;
      }
      case AssessmentType.BIG_FIVE: {
        // Accept any object with at least the main five traits as numbers
        const results = rawResults as Record<string, number>;
        const requiredTraits = [
          'openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'
        ];
        if (!requiredTraits.every(trait => typeof results[trait] === 'number')) {
          return 'Invalid Big Five results structure';
        }
        break;
      }
    }
    return null;
  } catch {
    return 'Invalid results structure';
  }
}
