import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconBrain, IconBook, IconVideo, IconUsers, IconCertificate, IconChalkboard } from "@tabler/icons-react"

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
        {/* Hero Section */}
        <section className="relative w-full py-32 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Welcome to Tutorium
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Experience a new era of learning with certified lecturers, interactive Q&A,
              and high-quality video lessons tailored for engineering students.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ask">
                <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-semibold text-lg px-8">
                  Ask a Question
                </Button>
              </Link>
              <Link href="/lessons">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-semibold text-lg px-8">
                  Browse Lessons
                </Button>
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-sm text-blue-100">
              <div className="flex flex-col items-center gap-2">
                <IconBrain className="h-8 w-8" />
                <span>Expert Lecturers</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconVideo className="h-8 w-8" />
                <span>HD Video Content</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconCertificate className="h-8 w-8" />
                <span>Earn Certificates</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconUsers className="h-8 w-8" />
                <span>Active Community</span>
              </div>
            </div>
          </div>
        </section>
        {/* Core Features */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why Choose Tutorium?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience a comprehensive learning platform designed specifically for engineering students
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="absolute -top-6 left-8 bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <IconChalkboard className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-blue-900 mt-4">Expert Lecturers</h3>
                <p className="text-gray-600 mt-3">
                  Learn from certified professionals with years of industry and academic experience in engineering fields.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    Industry-verified credentials
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    Personalized attention
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    Real-world expertise
                  </li>
                </ul>
              </div>

              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="absolute -top-6 left-8 bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <IconBook className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-blue-900 mt-4">Interactive Learning</h3>
                <p className="text-gray-600 mt-3">
                  Engage in dynamic Q&A sessions and participate in focused discussions with peers and lecturers.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    Real-time responses
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    Community discussions
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    Peer learning opportunities
                  </li>
                </ul>
              </div>

              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="absolute -top-6 left-8 bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <IconVideo className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-blue-900 mt-4">Rich Content</h3>
                <p className="text-gray-600 mt-3">
                  Access high-quality video lessons, downloadable resources, and interactive learning materials.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    HD video lessons
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    Practice exercises
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                    Study materials
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of students who are already advancing their engineering careers with Tutorium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8">
                  Create Account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* Preview of Question Board */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Recently Answered Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore real questions answered by our expert lecturers
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <IconBrain className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-blue-900 mb-2">
                      How does a cantilever beam work in real-world structures?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Learn about the principles behind cantilever beams and their applications in modern construction...
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <img
                          src="/placeholder-user.jpg"
                          alt="User"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-gray-600">Asked by Musa A.</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <span>Answered by Engr. Kola Akinwale</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <IconBrain className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-blue-900 mb-2">
                      What is the purpose of a flywheel in a mechanical system?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Discover how flywheels store rotational energy and regulate engine speed in mechanical systems...
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <img
                          src="/placeholder-user.jpg"
                          alt="User"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-gray-600">Asked by Ngozi O.</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <span>Answered by Prof. Danladi Umar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link href="/questions">
                <Button variant="outline" size="lg" className="gap-2">
                  View All Questions
                  <span className="text-lg">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Video Classroom Preview */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Featured Video Lessons</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Watch high-quality engineering lectures from top educators
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src="/placeholder.jpg"
                      alt="Thermodynamics"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" className="bg-white text-blue-900">
                      Watch Now
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Dr. Abiola Ajayi"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dr. Abiola Ajayi</h4>
                      <p className="text-sm text-gray-500">Professor of Mechanical Engineering</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Thermodynamics 101</h3>
                  <p className="text-gray-600 text-sm">
                    Introduction to the fundamental principles of thermodynamics and their applications.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src="/placeholder.jpg"
                      alt="Structural Analysis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" className="bg-white text-blue-900">
                      Watch Now
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Dr. Sarah Chen"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dr. Sarah Chen</h4>
                      <p className="text-sm text-gray-500">Civil Engineering Expert</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Structural Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Learn how to analyze and design complex structural systems.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src="/placeholder.jpg"
                      alt="Circuit Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" className="bg-white text-blue-900">
                      Watch Now
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Prof. James Wilson"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">Prof. James Wilson</h4>
                      <p className="text-sm text-gray-500">Electronics Engineering Lead</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Digital Circuit Design</h3>
                  <p className="text-gray-600 text-sm">
                    Master the fundamentals of digital electronics and circuit design.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/lessons">
                <Button variant="outline" size="lg" className="gap-2">
                  Browse All Lessons
                  <span className="text-lg">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-white border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Tutorium. All rights reserved.
        </footer>
      </main>
    </>
  )
}
