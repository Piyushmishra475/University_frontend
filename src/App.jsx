import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LP1 from './pages/LP1'
import LP2 from './pages/LP2'

export default function App(){
  return (
    <div>
      <nav className="topnav">
        <Link to="/">LP-1</Link>
        <Link to="/b">LP-2</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LP1/>} />
        <Route path="/b" element={<LP2/>} />
      </Routes>

      <footer className="footer">Landing SPA</footer>
    </div>
  )
}
