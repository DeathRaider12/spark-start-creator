import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export default function useUser() {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        setRole(null)
        setLoading(false)
        return
      }

      const docRef = doc(db, "users", firebaseUser.uid)
      const docSnap = await getDoc(docRef)

      setUser(firebaseUser)
      setRole(docSnap.exists() ? docSnap.data().role : "pending")
      setLoading(false)
    })

    return () => unsub()
  }, [])

  return { user, role, loading }
}