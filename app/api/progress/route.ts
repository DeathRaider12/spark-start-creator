import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase'
import { updateCourseProgress } from '@/lib/firebase-collections'
import type { CourseProgress } from '@/lib/firebase-types'

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
        const { courseId, completedLessons, quizScores, progress } = body

        const progressData: CourseProgress = {
            id: `${user.uid}_${courseId}`, // Create a predictable ID
            userId: user.uid,
            courseId,
            completedLessons,
            quizScores,
            progress,
            lastAccessed: new Date(),
            startedAt: new Date(),
            updatedAt: new Date(),
        }

        await updateCourseProgress(progressData)

        // Check if we should award any achievements
        await checkAndAwardAchievements(user.uid, courseId, progress)

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}

async function checkAndAwardAchievements(userId: string, courseId: string, progress: number) {
    // Example achievement checks:

    // Check for course completion
    if (progress === 100) {
        await createAchievement({
            userId,
            title: "Course Completed",
            description: "Successfully completed a course",
            icon: "trophy",
        })
    }

    // Check for quick learner (complete 50% in less than a week)
    if (progress >= 50) {
        // Add your achievement logic here
    }

    // Check for perfect score
    // Add more achievement checks as needed
}
