"use client"

import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LogoutButton() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      navigate("/login")
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
