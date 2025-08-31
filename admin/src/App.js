import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminSongs from './components/AdminSongs';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('lloyd-token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('lloyd-token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Lloyd Rego - Admin Panel</h1>
        {isLoggedIn && <button onClick={handleLogout} className="logout-btn">Logout</button>}
      </header>
      
      <main className="main-content">
        {isLoggedIn ? <AdminSongs /> : <AdminLogin onLogin={handleLogin} />}
      </main>
    </div>
  );
}

export default App;
