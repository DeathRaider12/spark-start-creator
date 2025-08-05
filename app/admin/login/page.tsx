"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"
import { Card, CardHeader, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { IconLock } from "@tabler/icons-react"

const ADMIN_EMAILS = ["lateefedidi4@gmail.com", "envostructs@gmail.com"]
const ADMIN_PASSWORD = "ADMIN_TUTORIUM"

export default function AdminLoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const [email, setEmail] = useState(searchParams.get("email") || "")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Verify this is an admin email
        if (!ADMIN_EMAILS.includes(email)) {
            navigate("/login", { replace: true })
        }
    }, [email])

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error("Please fill in all fields")
            return
        }

        if (password !== ADMIN_PASSWORD) {
            toast.error("Invalid admin credentials")
            return
        }

        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Welcome, Admin!")
            navigate("/admin")
        } catch (err: any) {
            toast.error("Authentication failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <IconLock className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Admin Authentication
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please verify your admin credentials
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAdminLogin} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Admin Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                disabled
                                className="mt-1 bg-gray-50"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Admin Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify Admin Access"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
