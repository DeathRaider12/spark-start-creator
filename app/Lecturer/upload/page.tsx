"use client"

import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db, storage } from "@/lib/firebase"
import toast from "react-hot-toast"
import AuthGuard from "../../../src/components/AuthGuard"

export default function UploadLessonPage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: any) => {
    e.preventDefault()
    if (!file) return toast.error("No file selected")
    setUploading(true)

    const storageRef = ref(storage, `lessons/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", null, console.error, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref)
      await addDoc(collection(db, "lessons"), {
        title,
        videoUrl: url,
        uploadedBy: auth.currentUser?.email,
        createdAt: serverTimestamp(),
      })
      toast.success("Lesson uploaded")
      setTitle("")
      setFile(null)
    })
  }

  return (
    <AuthGuard>
      <form onSubmit={handleUpload} className="max-w-xl mx-auto p-6 space-y-4">
        <h1 className="text-xl font-bold">Upload Lesson</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          placeholder="Lesson Title"
        />
        <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className="bg-blue-600 text-white p-2 w-full" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </AuthGuard>
  )
}
