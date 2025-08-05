import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase'
import { createDiscussion, addDiscussionReply } from '@/lib/firebase-collections'
import type { Discussion } from '@/lib/firebase-types'

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
        const { title, content, courseId, tags } = body

        const discussionData: Omit<Discussion, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'replies'> = {
            title,
            content,
            authorId: user.uid,
            courseId,
            tags,
        }

        const discussionId = await createDiscussion(discussionData)

        return NextResponse.json({ discussionId })
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
        const { discussionId, content } = body

        await addDiscussionReply(discussionId, content, user.uid)

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
