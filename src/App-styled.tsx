import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Toaster } from 'sonner'

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <div className="py-32 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-800">Welcome to Tutorium</h1>
        <p className="text-xl mb-8 text-gray-600">Learning platform for students and educators</p>
        <Link 
          to="/login" 
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to Tutorium</h2>
        <form className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

function NavBar() {
  return (
    <nav className="bg-white border-b shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700">Tutorium</Link>
      <div className="space-x-4 text-sm">
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <>
      <NavBar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}