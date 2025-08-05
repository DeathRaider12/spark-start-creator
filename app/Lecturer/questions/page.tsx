"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import AuthGuard from "../../../src/components/AuthGuard"
import toast from "react-hot-toast"

export default function LecturerQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([])
  const [answer, setAnswer] = useState("")

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "questions"), where("answered", "==", false))
      const snap = await getDocs(q)
      setQuestions(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }
    fetch()
  }, [])

  const handleAnswer = async (id: string) => {
    await updateDoc(doc(db, "questions", id), {
      answered: true,
      answer,
      answeredAt: new Date(),
    })
    toast.success("Answered!")
    setAnswer("")
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-bold mb-6">Unanswered Questions</h1>
        {questions.map((q) => (
          <div key={q.id} className="border p-4 mb-6 rounded bg-white">
            <h2 className="font-semibold">{q.title}</h2>
            <p>{q.description}</p>
            <textarea
              placeholder="Your answer"
              className="w-full border p-2 mt-2"
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button className="bg-green-600 text-white px-4 py-1 mt-2" onClick={() => handleAnswer(q.id)}>
              Submit Answer
            </button>
          </div>
        ))}
      </div>
    </AuthGuard>
  )
}
