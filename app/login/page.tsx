"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) router.push("/dashboard")
    })
    return () => unsub()
  }, [router])

  const login = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (!res.user.emailVerified) {
        toast.error("Please verify your email.")
        return
      }
      toast.success("Logged in!")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    setLoading(true)
    try {
      const res = await signInWithPopup(auth, googleProvider)
      toast.success("Logged in with Google!")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error("Google login error. Try enabling popups.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={login} className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input
        placeholder="Email"
        className="w-full border p-2 mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        className="w-full border p-2 mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading} className="w-full bg-blue-600 text-white p-2 mb-2">
        Log In
      </button>
      <button
        type="button"
        disabled={loading}
        className="w-full border p-2 text-gray-700"
        onClick={googleLogin}
      >
        Continue with Google
      </button>
    </form>
  )
}
