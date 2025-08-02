"use client"

import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleLogout} variant="outline" disabled={loading}>
      {loading ? "Logging out..." : "Log Out"}
    </Button>
  )
}
