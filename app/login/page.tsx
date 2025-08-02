"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      setLoading(false)
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      await signInWithPopup(auth, googleProvider)
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Google login error:", err)
      if (err.code === "auth/unauthorized-domain") {
        setError(
          "Google login failed: Your domain is not authorized. Please add it to Firebase Console > Authentication > Settings > Authorized domains.",
        )
      } else {
        setError(err.message || "An error occurred during Google login")
      }
    } finally {
      setLoading(false)
    }
  }

  // Optional: Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard")
      }
    })
    return () => unsubscribe()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Log In to Tutorium</h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">{error}</div>}

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-800 mb-4" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>

        <div className="text-center mb-4">
          <span className="text-gray-500">or</span>
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white hover:bg-red-600 mb-6"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Continue with Google"}
        </Button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}
