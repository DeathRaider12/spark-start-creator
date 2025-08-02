"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login")
      else setLoading(false)
    })
    return () => unsub()
  }, [router])

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>

  return <>{children}</>
}
