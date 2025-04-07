import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { connectToDatabase } from '@/lib/database'

interface CoachingPrompt {
  userId: string
  sessionId: string
  message: string
}

interface AIResponse {
  text: string
  recommendations: string[]
  nextSteps: string[]
}

const model = createLanguageModel({
  provider: openai('gpt-4-turbo')
})

export async function handleCoachingRequest(prompt: CoachingPrompt): Promise<AIResponse> {
  try {
    // Connect to database using MCP server pattern
    const db = await connectToDatabase(process.env.DATABASE_URL!)
    
    // Retrieve user context
    const user = await db.users.findUnique({
      where: { id: prompt.userId },
      include: { assessments: true }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Core coaching prompt template
    const systemPrompt = [
      `You are a professional development coach analyzing ${user.fullName}'s profile.`,
      `Personality: ${user.personalityType}`,
      `Career Stage: ${user.careerStage}`,
      `Assessment Results: ${JSON.stringify(user.assessments)}`,
      ``,
      `User Query: ${prompt.message}`,
      ``,
      `Guidelines:`,
      `1. Provide practical, actionable advice`,
      `2. Relate to personality and assessment results`,
      `3. Suggest 3-5 specific next steps`,
      `4. Keep tone empathetic yet professional`
    ].join('\n')

    const { text } = await generateText({
      model,
      system: systemPrompt,
      maxTokens: 1000,
      temperature: 0.7
    })

    // Extract structured data from response
    return {
      text,
      recommendations: extractSection(text, 'Recommendations'),
      nextSteps: extractSection(text, 'Next Steps')
    }
  } catch (error) {
    console.error('Coaching request failed:', error)
    throw error
  }
}

function extractSection(text: string, title: string): string[] {
  const startIdx = text.indexOf(title)
  if (startIdx === -1) return []
  
  const sectionStart = text.indexOf('\n', startIdx) + 1
  const endIdx = text.indexOf('\n\n', sectionStart)
  const sectionText = endIdx === -1
    ? text.slice(sectionStart)
    : text.slice(sectionStart, endIdx)
  
  return sectionText
    .split('\n')
    .map(line => line.replace(/^- /, '').trim())
    .filter(Boolean)
}