import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx'
import Timer from './components/timer.jsx'
// import Counter from './components/counter.jsx'
import CounterSutet from './components/counterSutet.jsx'
import CounterDPM from './components/counterDPM.jsx'

function App() {
  return (
    <BrowserRouter>
      {/* Gradient Biru Royal: Dari Biru Gelap ke Biru Terang sedikit */}
      <div className='min-h-screen bg-gradient-to-br from-[#0b1736] via-[#102a71] to-[#0b1736] text-white selection:bg-yellow-400 selection:text-blue-900'>
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