// Firebase Collection Types
export interface Achievement {
    id: string
    userId: string
    title: string
    description: string
    icon: 'trophy' | 'star' | 'zap' | 'book' | 'target' | 'award'
    earnedDate?: Date
    progress?: {
        current: number
        total: number
    }
    createdAt: Date
    updatedAt: Date
}

export interface StudyGroup {
    id: string
    name: string
    description: string
    courseId: string
    ownerId: string
    members: {
        userId: string
        role: 'admin' | 'member'
        joinedAt: Date
    }[]
    maxMembers: number
    meetingSchedule?: {
        day: string
        time: string
        frequency: 'weekly' | 'biweekly' | 'monthly'
    }
    tags: string[]
    createdAt: Date
    updatedAt: Date
}

export interface Discussion {
    id: string
    title: string
    content: string
    authorId: string
    courseId?: string
    tags: string[]
    replies: {
        id: string
        content: string
        authorId: string
        createdAt: Date
        updatedAt: Date
    }[]
    views: number
    createdAt: Date
    updatedAt: Date
}

export interface Certificate {
    id: string
    userId: string
    courseId: string
    courseTitle: string
    instructorName: string
    completionDate: Date
    grade?: string
    skills: string[]
    certificateUrl: string
    createdAt: Date
}

export interface CourseProgress {
    id: string
    userId: string
    courseId: string
    completedLessons: string[] // Array of lesson IDs
    quizScores: {
        quizId: string
        score: number
        completedAt: Date
    }[]
    lastAccessed: Date
    progress: number // Percentage of course completed
    startedAt: Date
    updatedAt: Date
}

// Collection Names
export const COLLECTIONS = {
    ACHIEVEMENTS: 'achievements',
    STUDY_GROUPS: 'study-groups',
    DISCUSSIONS: 'discussions',
    CERTIFICATES: 'certificates',
    COURSE_PROGRESS: 'course-progress',
} as const
