import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { IconBrandGoogle, IconMail } from "@tabler/icons-react"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) navigate("/dashboard")
    })
    return () => unsub()
  }, [navigate])

  const ADMIN_EMAILS = ["lateefedidi4@gmail.com", "envostructs@gmail.com"]

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    // Check if it's an admin email
    if (ADMIN_EMAILS.includes(email)) {
      navigate(`/admin/login?email=${encodeURIComponent(email)}`)
      return
    }

    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (!res.user.emailVerified) {
        toast.error("Please verify your email first.")
        return
      }
      toast.success("Welcome back!")
      navigate("/dashboard")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const email = result.user.email

      // Check if the Google account is an admin account
      if (email && ADMIN_EMAILS.includes(email)) {
        navigate(`/admin/login?email=${encodeURIComponent(email)}`)
        return
      }

      toast.success("Welcome to Tutorium!")
      navigate("/dashboard")
    } catch (err: any) {
      if (err.code === 'auth/popup-blocked') {
        toast.error("Please allow popups for this site to use Google login")
      } else {
        toast.error("Google login failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={login} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="flex justify-between">
                <span>Password</span>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <IconMail className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign in with Email"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            variant="outline"
            onClick={googleLogin}
            disabled={loading}
            className="w-full"
          >
            <IconBrandGoogle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
