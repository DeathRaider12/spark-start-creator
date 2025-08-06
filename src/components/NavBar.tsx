import React, { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"

export default function NavBar() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser)
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <nav className="bg-white border-b shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700">Tutorium</Link>
      <div className="space-x-4 text-sm">
        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="text-red-600">Logout</button>
          </>
        )}
        {!user && <Link to="/login">Login</Link>}
      </div>
    </nav>
  )
}