
import React from 'react'
import NavBar from '../../components/NavBar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}
