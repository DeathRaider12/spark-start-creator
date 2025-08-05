import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase'
import { createStudyGroup, joinStudyGroup } from '@/lib/firebase-collections'
import type { StudyGroup } from '@/lib/firebase-types'

export async function POST(request: Request) {
    try {
        const user = auth.currentUser
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { name, description, courseId, maxMembers, meetingSchedule, tags } = body

        const groupData: Omit<StudyGroup, 'id' | 'createdAt' | 'updatedAt'> = {
            name,
            description,
            courseId,
            ownerId: user.uid,
            members: [{
                userId: user.uid,
                role: 'admin',
                joinedAt: new Date()
            }],
            maxMembers,
            meetingSchedule,
            tags,
        }

        const groupId = await createStudyGroup(groupData)

        return NextResponse.json({ groupId })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request) {
    try {
        const user = auth.currentUser
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { groupId } = body

        await joinStudyGroup(groupId, user.uid)

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
