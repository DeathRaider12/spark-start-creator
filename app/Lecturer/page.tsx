import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useNavigate } from "react-router-dom"
import AuthGuard from "../../src/components/AuthGuard"

export default function LecturerDashboard() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login")
        return
      }

      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists() || userSnap.data().role !== "lecturer") {
        navigate("/dashboard")
        return
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-blue-800">Lecturer Dashboard</h1>
          <p className="text-gray-700 mb-6">Here you can manage lessons, answer questions, and more.</p>
          {/* Add lecturer tools here */}
        </div>
      </div>
    </AuthGuard>
  )
}
