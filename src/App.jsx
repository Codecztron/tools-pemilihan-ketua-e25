import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx'
import Timer from './components/timer.jsx'
import Counter from './components/counter.jsx'
import CounterSutet from './components/counterSutet.jsx'
import CounterDPM from './components/counterDPM.jsx'

function App() {
  return (
    <BrowserRouter>
    <div className='min-h-screen bg-linear-to-br from-[#0a0f2c] via-[#1a1a5b] to-[#3a1c5e]'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/counter" element={<Counter />} /> */}
          <Route path="/counter-sutet" element={<CounterSutet />} />
          <Route path="/counter-dpm" element={<CounterDPM />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
