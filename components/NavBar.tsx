"use client"

import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NavBar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser)
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  return (
    <nav className="bg-white border-b shadow px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-700">Tutorium</Link>
      <div className="space-x-4 text-sm">
        {user && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="text-red-600">Logout</button>
          </>
        )}
        {!user && <Link href="/login">Login</Link>}
      </div>
    </nav>
  )
}
