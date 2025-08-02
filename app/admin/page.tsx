"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import AuthGuard from "@/components/AuthGuard"
import { Button } from "@/components/ui/button"

interface UserData {
  id: string
  email: string
  requestedRole: string
  displayName: string
  role: string
}

export default function AdminPage() {
  const [pendingUsers, setPendingUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch pending users from Firestore
  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true)
      const q = query(collection(db, "users"), where("role", "==", "pending"))
      const snapshot = await getDocs(q)

      const users = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as UserData[]

      setPendingUsers(users)
      setLoading(false)
    }

    fetchPendingUsers()
  }, [])

  const handleApprove = async (userId: string, approvedRole: "lecturer" | "student") => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      role: approvedRole,
    })

    // Remove from list
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId))
  }
if (user?.email !== "lateefedidi4@gmail.com") {
  router.push("/dashboard")
}

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Pending Account Approvals</h1>

          {loading && <p className="text-center text-gray-500">Loading users...</p>}

          {pendingUsers.length === 0 && !loading && (
            <p className="text-center text-gray-500">No users waiting for approval.</p>
          )}

          <div className="space-y-6">
            {pendingUsers.map((user) => (
              <div key={user.id} className="bg-white p-6 rounded-lg shadow-md border">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
                <p><strong>Requested Role:</strong> {user.requestedRole}</p>

                <div className="mt-4 flex gap-4">
                  <Button
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={() => handleApprove(user.id, "lecturer")}
                  >
                    Approve as Lecturer
                  </Button>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => handleApprove(user.id, "student")}
                  >
                    Approve as Student
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
