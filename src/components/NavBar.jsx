import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [open] = useState(false);

  const prevent = (e) => e.preventDefault();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Estate<span> Agent</span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <a href="#" onClick={prevent}>Home</a>
          <a href="#" onClick={prevent}>About</a>
          <a href="#" onClick={prevent}>Contact</a>
        </nav>

      </div>
    </header>
  );
};

export default NavBar;

