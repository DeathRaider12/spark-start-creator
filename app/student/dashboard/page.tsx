"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import AuthGuard from "../../../src/components/AuthGuard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { StudentProgress } from "../../../components/student-progress"
import { AchievementsDisplay } from "../../../components/achievements"
import { DiscussionForum } from "../../../components/discussion-forum"
import { StudyGroups } from "../../../components/study-groups"
import { Certificates } from "../../../components/certificates"
import { NotificationCenter } from "../../../components/notification-center"
import { Link } from "react-router-dom"

export default function StudentDashboard() {
  const [questions, setQuestions] = useState<any[]>([])

  // Sample data - replace with real data from your backend
  const progress = {
    courses: [
      {
        courseId: "1",
        courseName: "Introduction to Engineering",
        progress: 75,
        totalLessons: 12,
        completedLessons: 9,
        lastAccessed: new Date(),
      },
    ],
  }

  const achievements = [
    {
      id: "1",
      title: "Quick Learner",
      description: "Complete your first course",
      icon: "trophy" as const,
      earnedDate: new Date(),
    },
    {
      id: "2",
      title: "Discussion Master",
      description: "Participate in 10 discussions",
      icon: "star" as const,
      progress: {
        current: 7,
        total: 10,
      },
    },
  ]

  useEffect(() => {
    const fetch = async () => {
      const user = auth.currentUser
      if (!user) return
      const q = query(collection(db, "questions"), where("userId", "==", user.uid))
      const snap = await getDocs(q)
      setQuestions(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }
    fetch()
  }, [])

  return (
    <AuthGuard>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <NotificationCenter />
        </div>

        <Tabs defaultValue="progress">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="study-groups">Study Groups</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <StudentProgress courses={progress.courses} />
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Questions</h2>
                <Link
                  to="/ask"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Ask New Question
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
                  >
                    <h3 className="font-semibold mb-2">{question.title}</h3>
                    <p className="text-muted-foreground mb-4">{question.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${question.answered ? "text-green-500" : "text-yellow-500"
                        }`}>
                        Status: {question.answered ? "Answered" : "Pending"}
                      </span>
                      <Link
                        to={`/questions/${question.id}`}
                        className="text-primary hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsDisplay achievements={achievements} />
          </TabsContent>

          <TabsContent value="discussions">
            <DiscussionForum />
          </TabsContent>

          <TabsContent value="study-groups">
            <StudyGroups />
          </TabsContent>

          <TabsContent value="certificates">
            <Certificates />
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  )
}

