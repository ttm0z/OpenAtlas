import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        
        <li>
          <Link to="/">Home</Link>
        </li>
        
        <li>
          <Link to="/">Maps</Link>
        </li>
        
        <li>
          <Link to="/">Sign Up</Link>
        </li>

        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/getUsers">Get Users</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;