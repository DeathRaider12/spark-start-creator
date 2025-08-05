import React from 'react'

interface SeoMetaProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
}

export function SeoMeta({ 
  title = "Tutorium - Learn with Expert Lecturers",
  description = "Connect with certified lecturers, get answers to your questions, and access high-quality educational content.",
  keywords = "education, tutoring, lectures, learning, questions, answers",
  ogImage = "/placeholder.jpg"
}: SeoMetaProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}