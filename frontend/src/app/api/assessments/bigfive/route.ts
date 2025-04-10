import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, results } = body

    if (!userId || !results) {
      return NextResponse.json({ error: 'Missing userId or results' }, { status: 400 })
    }

    const assessment = await prisma.assessment.create({
      data: {
        userId,
        type: 'BIG_FIVE',
        rawResults: results,
        processedInsights: {}, // Optionally process insights here
      },
    })

    return NextResponse.json({ success: true, assessment })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save assessment' }, { status: 500 })
  }
}