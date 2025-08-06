import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useNavigate } from "react-router-dom"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login")
      else setLoading(false)
    })
    return () => unsub()
  }, [navigate])

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>

  return <>{children}</>
}