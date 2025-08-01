// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login status
    localStorage.removeItem('isLoggedIn');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <span className="navbar-brand">Smart SaaS Dashboard</span>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
