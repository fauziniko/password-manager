import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import type { Session } from 'next-auth'

const modemSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  ipAddress: z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, 'Invalid IP address'),
  username: z.string().min(1),
  password: z.string().min(1),
  description: z.string().optional()
})

// PUT - Update a modem
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions) as Session | null
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = modemSchema.parse(body)

    // Check if modem exists and belongs to user
    const existingModem = await prisma.modem.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!existingModem) {
      return NextResponse.json({ error: 'Modem not found' }, { status: 404 })
    }

    const modem = await prisma.modem.update({
      where: { id },
      data
    })

    return NextResponse.json(modem)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a modem
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions) as Session | null
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if modem exists and belongs to user
    const existingModem = await prisma.modem.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!existingModem) {
      return NextResponse.json({ error: 'Modem not found' }, { status: 404 })
    }

    await prisma.modem.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Modem deleted successfully' })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
