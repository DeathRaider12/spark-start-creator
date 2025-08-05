"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconCheck, IconX, IconLoader2 } from "@tabler/icons-react"

const ADMIN_EMAILS = ["lateefedidi4@gmail.com", "envostructs@gmail.com"]

export default function AdminPage() {
  const [pendingUsers, setPendingUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    // Verify admin access
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
        router.replace("/login")
        toast.error("Admin access required")
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        setLoading(true)
        const q = query(collection(db, "users"), where("role", "==", "pending"))
        const snap = await getDocs(q)
        setPendingUsers(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      } catch (error) {
        toast.error("Failed to load pending users")
      } finally {
        setLoading(false)
      }
    }

    if (user && ADMIN_EMAILS.includes(user.email || "")) {
      fetchPendingUsers()
    }
  }, [user])

  const handleApprove = async (id: string, role: string) => {
    try {
      await updateDoc(doc(db, "users", id), {
        role,
        approvedAt: new Date(),
        approvedBy: user?.email
      })
      setPendingUsers((prev) => prev.filter((u) => u.id !== id))
      toast.success(`User approved as ${role}`)
    } catch (error) {
      toast.error("Failed to approve user")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-5xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-500">
              Logged in as: {user?.email}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <IconLoader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No pending approvals at this time
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{u.email}</p>
                    <p className="text-sm text-gray-500">
                      Requested Role: <span className="font-medium text-blue-600">{u.requestedRole}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Requested at: {new Date(u.createdAt?.toDate()).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(u.id, "lecturer")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <IconCheck className="h-4 w-4 mr-1" />
                      Approve as Lecturer
                    </Button>
                    <Button
                      onClick={() => handleApprove(u.id, "student")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <IconCheck className="h-4 w-4 mr-1" />
                      Approve as Student
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
