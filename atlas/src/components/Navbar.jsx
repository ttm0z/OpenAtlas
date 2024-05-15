import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className='navbar-item'>
          OpenAtlas
        </li>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/maps" className="navbar-link">Maps</Link>
        </li>
        <li className="navbar-item">
          <Link to="/signup" className="navbar-link">Sign Up</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Login</Link>
        </li>
        <li className="navbar-item">
          <Link to="/getUsers" className="navbar-link">Get Users</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
