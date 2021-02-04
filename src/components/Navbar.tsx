import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import '../styles/text.css';

function Navbar() {
  return (
    <div className="navbar-container text-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/random-draft">Button</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign in</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;