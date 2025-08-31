import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Music from './pages/Music';
import About from './pages/About';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <header>
        <nav style={{ display:'flex', gap:'1rem', padding:'1rem' }}>
          <Link to="/">Home</Link>
          <Link to="/music">Music</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main style={{ padding:'2rem' }}>
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
