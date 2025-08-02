"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import AuthGuard from "@/components/AuthGuard"
import { Button } from "@/components/ui/button"
import { onAuthStateChanged } from "firebase/auth"

export default function AskPage() {
  const router = useRouter()

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  // Get current user ID
  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid)
    })
    return () => unsubscribe()
  })

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    if (!title || !description || !subject) {
      setError("All fields are required.")
      return
    }

    if (!userId) {
      setError("User not authenticated.")
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db, "questions"), {
        title,
        description,
        subject,
        userId,
        createdAt: serverTimestamp(),
        status: "unanswered",
      })
      setSuccess("Question submitted successfully!")
      setTimeout(() => router.push("/questions"), 1500)
    } catch (err: any) {
      console.error("Error submitting question:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Ask a Question</h1>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Feedback messages */}
              {error && <p className="text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded">{error}</p>}
              {success && <p className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded">{success}</p>}

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Question Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="E.g. How does a cantilever beam support load?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  rows={6}
                  placeholder="Explain your question clearly. Add context or any formulas you're using."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Area
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={loading}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="mechanical">Mechanical Engineering</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="electrical">Electrical Engineering</option>
                  <option value="chemical">Chemical Engineering</option>
                  <option value="computer">Computer Engineering</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 text-white hover:bg-blue-800"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Question"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
