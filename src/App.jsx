import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LP1 from './pages/LP1'
import LP2 from './pages/LP2'

export default function App(){
  return (
    <div>
      <nav className="topnav">
        <div className="nav-container">
          <Link to="/" className="logo">University Portal</Link>
          <div className="nav-links">
            <Link to="/">Riverside University</Link>
            <Link to="/b">Hillcrest Institute</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LP1/>} />
        <Route path="/b" element={<LP2/>} />
      </Routes>
    </div>
  )
}
