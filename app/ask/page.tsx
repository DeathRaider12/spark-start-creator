"use client"

import AuthGuard from "@/components/AuthGuard"
import { Button } from "@/components/ui/button"

export default function AskPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Ask a Question</h1>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <form className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Question Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your question title..."
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Question Description
                </label>
                <textarea
                  id="description"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide detailed description of your question..."
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="mechanical">Mechanical Engineering</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="electrical">Electrical Engineering</option>
                  <option value="chemical">Chemical Engineering</option>
                  <option value="computer">Computer Engineering</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-800">
                Submit Question
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
