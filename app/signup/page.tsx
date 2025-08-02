"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, googleProvider, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "student",
        createdAt: new Date(),
        displayName: user.displayName || "",
      })

      router.push("/dashboard")
    } catch (err: any) {
      console.error("Signup error:", err)
      setError(err.message || "An error occurred during signup")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError("")
    setLoading(true)

    try {
      const userCredential = await signInWithPopup(auth, googleProvider)
      const user = userCredential.user

      // Check if user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid)
      const userDocSnap = await getDoc(userDocRef)

      if (!userDocSnap.exists()) {
        // Create new user document
        await setDoc(userDocRef, {
          email: user.email,
          role: "student",
          createdAt: new Date(),
          displayName: user.displayName || "",
        })
      }

      router.push("/dashboard")
    } catch (err: any) {
      console.error("Google signup error:", err)
      setError(err.message || "An error occurred during Google signup")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Sign Up for Tutorium</h2>

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

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700 mb-4" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>

        <div className="text-center mb-4">
          <span className="text-gray-500">or</span>
        </div>

        <Button
          type="button"
          className="w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 mb-6"
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Continue with Google"}
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline hover:no-underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  )
}
