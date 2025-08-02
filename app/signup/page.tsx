"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import toast from "react-hot-toast"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        requestedRole: role,
        role: "pending",
        createdAt: new Date(),
      })

      await sendEmailVerification(user)
      toast.success("Account created! Please verify your email.")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignup} className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
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
      <select className="w-full border p-2 mb-4" onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="lecturer">Lecturer</option>
      </select>
      <button disabled={loading} className="bg-blue-600 text-white p-2 w-full">
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  )
}
