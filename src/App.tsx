
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import NavBar from '@/components/NavBar'
import HomePage from '@/app/page'
import LoginPage from '@/app/login/page'
import SignupPage from '@/app/signup/page'
import DashboardPage from '@/app/dashboard/page'
import AdminPage from '@/app/admin/page'
import AdminLoginPage from '@/app/admin/login/page'
import AskPage from '@/app/ask/page'
import LecturerPage from '@/app/Lecturer/page'
import LecturerQuestionsPage from '@/app/Lecturer/questions/page'
import LecturerUploadPage from '@/app/Lecturer/upload/page'

export default function App() {
  return (
    <>
      <NavBar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/Lecturer" element={<LecturerPage />} />
        <Route path="/Lecturer/questions" element={<LecturerQuestionsPage />} />
        <Route path="/Lecturer/upload" element={<LecturerUploadPage />} />
      </Routes>
    </>
  )
}
