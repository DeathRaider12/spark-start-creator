"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, googleProvider, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (!role) return setError("Please select a role.")
    if (password.length < 6) return setError("Password too short.")
    if (password !== confirmPassword) return setError("Passwords don't match.")

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCred.user

      await sendEmailVerification(user)
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "pending",
        requestedRole: role,
        createdAt: new Date(),
        displayName: user.displayName || "",
      })

      setMessage("Verification email sent. Please check your inbox.")
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  const handleGoogleSignup = async () => {
  setError("")
  setMessage("")
  setLoading(true)

  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "pending",
        requestedRole: "lecturer", // or default
        createdAt: new Date(),
        displayName: user.displayName || "",
      })
    }

    router.push("/dashboard")
  } catch (err: any) {
    console.error("Google signup error:", err)
    setError("Google signup failed. Please try again.")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Sign Up</h2>

        {error && <p className="text-red-600 bg-red-50 border px-4 py-2 rounded mb-4">{error}</p>}
        {message && <p className="text-green-700 bg-green-50 border px-4 py-2 rounded mb-4">{message}</p>}

        <input type="email" className="w-full px-4 py-2 border mb-4 rounded" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />

        <input type="password" className="w-full px-4 py-2 border mb-4 rounded" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required />

        <input type="password" className="w-full px-4 py-2 border mb-4 rounded" placeholder="Confirm Password"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} required />

        <select
          className="w-full px-4 py-2 border mb-6 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled={loading}
        >
          <option value="">Select account type</option>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>

        <Button type="submit" disabled={loading} className="w-full bg-green-600 text-white">
          {loading ? "Creating..." : "Sign Up"}
        </Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">Log In</Link>
        </p>
        <Button
  type="button"
  className="w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 mb-4"
  onClick={handleGoogleSignup}
  disabled={loading}
>
  {loading ? "Signing up..." : "Continue with Google"}
</Button>

      </form>
    </div>
  )
}
