import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

// Simple components without Firebase for testing
function SimpleNavBar() {
  return (
    <nav className="bg-white border-b shadow px-4 py-3 flex justify-between items-center">
      <span className="text-xl font-bold text-blue-700">Tutorium</span>
      <div className="space-x-4 text-sm">
        <a href="/login">Login</a>
      </div>
    </nav>
  )
}

function SimpleHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <div className="py-32 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Tutorium</h1>
        <p className="text-xl mb-8">Learning platform for students and educators</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded">Get Started</button>
      </div>
    </div>
  )
}

function SimpleLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <SimpleNavBar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<SimpleHomePage />} />
        <Route path="/login" element={<SimpleLoginPage />} />
        <Route path="*" element={<SimpleHomePage />} />
      </Routes>
    </>
  )
}