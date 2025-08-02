"use client"

import { useState } from "react"
import { auth, db } from "@/lib/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import toast from "react-hot-toast"
import AuthGuard from "@/components/AuthGuard"

export default function AskPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = auth.currentUser
      if (!user) return toast.error("Not authenticated")

      await addDoc(collection(db, "questions"), {
        title,
        description,
        subject,
        userId: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
        answered: false,
      })
      toast.success("Question submitted!")
      setTitle("")
      setDescription("")
      setSubject("")
    } catch (err: any) {
      toast.error("Failed to submit")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <form onSubmit={submit} className="max-w-xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Ask a Question</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          placeholder="Question title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
          placeholder="Question description"
        />
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2"
        >
          <option value="">Choose subject</option>
          <option value="mechanical">Mechanical</option>
          <option value="civil">Civil</option>
          <option value="electrical">Electrical</option>
        </select>
        <button disabled={loading} className="bg-blue-600 text-white p-2 w-full">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </AuthGuard>
  )
}
