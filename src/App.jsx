import React, { useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <Hero />
      <Features />
    </div>
  )
}

export default App
