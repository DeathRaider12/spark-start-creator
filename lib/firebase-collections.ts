import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import {
    Achievement,
    StudyGroup,
    Discussion,
    Certificate,
    CourseProgress,
    COLLECTIONS
} from './firebase-types'

// Achievement Functions
export async function createAchievement(achievement: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) {
    const achievementData = {
        ...achievement,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    }
    const docRef = await addDoc(collection(db, COLLECTIONS.ACHIEVEMENTS), achievementData)
    return docRef.id
}

export async function getUserAchievements(userId: string) {
    const q = query(
        collection(db, COLLECTIONS.ACHIEVEMENTS),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Achievement[]
}

// Study Group Functions
export async function createStudyGroup(group: Omit<StudyGroup, 'id' | 'createdAt' | 'updatedAt'>) {
    const groupData = {
        ...group,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    }
    const docRef = await addDoc(collection(db, COLLECTIONS.STUDY_GROUPS), groupData)
    return docRef.id
}

export async function joinStudyGroup(groupId: string, userId: string) {
    const groupRef = doc(db, COLLECTIONS.STUDY_GROUPS, groupId)
    const groupDoc = await getDoc(groupRef)

    if (!groupDoc.exists()) throw new Error('Group not found')

    const group = groupDoc.data() as StudyGroup
    if (group.members.length >= group.maxMembers) {
        throw new Error('Group is full')
    }

    await updateDoc(groupRef, {
        members: [...group.members, {
            userId,
            role: 'member',
            joinedAt: Timestamp.now(),
        }],
        updatedAt: Timestamp.now(),
    })
}

// Discussion Functions
export async function createDiscussion(discussion: Omit<Discussion, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'replies'>) {
    const discussionData = {
        ...discussion,
        views: 0,
        replies: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    }
    const docRef = await addDoc(collection(db, COLLECTIONS.DISCUSSIONS), discussionData)
    return docRef.id
}

export async function addDiscussionReply(discussionId: string, content: string, authorId: string) {
    const discussionRef = doc(db, COLLECTIONS.DISCUSSIONS, discussionId)
    const discussionDoc = await getDoc(discussionRef)

    if (!discussionDoc.exists()) throw new Error('Discussion not found')

    const discussion = discussionDoc.data() as Discussion
    await updateDoc(discussionRef, {
        replies: [...discussion.replies, {
            id: crypto.randomUUID(),
            content,
            authorId,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        }],
        updatedAt: Timestamp.now(),
    })
}

// Certificate Functions
export async function createCertificate(certificate: Omit<Certificate, 'id' | 'createdAt'>) {
    const certificateData = {
        ...certificate,
        createdAt: Timestamp.now(),
    }
    const docRef = await addDoc(collection(db, COLLECTIONS.CERTIFICATES), certificateData)
    return docRef.id
}

export async function getUserCertificates(userId: string) {
    const q = query(
        collection(db, COLLECTIONS.CERTIFICATES),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Certificate[]
}

// Course Progress Functions
export async function updateCourseProgress(progressData: Omit<CourseProgress, 'updatedAt'>) {
    const { id, ...data } = progressData
    const progressRef = doc(db, COLLECTIONS.COURSE_PROGRESS, id)

    await updateDoc(progressRef, {
        ...data,
        updatedAt: Timestamp.now(),
    })
}

export async function getUserCourseProgress(userId: string, courseId: string) {
    const q = query(
        collection(db, COLLECTIONS.COURSE_PROGRESS),
        where('userId', '==', userId),
        where('courseId', '==', courseId),
        limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null

    const doc = snapshot.docs[0]
    return {
        id: doc.id,
        ...doc.data(),
    } as CourseProgress
}
