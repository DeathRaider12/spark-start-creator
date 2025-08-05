import React from 'react'

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1e40af' }}>Welcome to Tutorium</h1>
      <p>This is a test to see if the basic React app works.</p>
      <button 
        style={{
          backgroundColor: '#1e40af',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Test Button
      </button>
    </div>
  )
}