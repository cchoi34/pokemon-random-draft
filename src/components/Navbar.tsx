import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userAuthUtils from '../utils/userAuthUtils';
import Button from './basic-elements/Button';
import '../styles/navbar.css';
import '../styles/text.css';

function Navbar() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  return (
    <div className="navbar-container text-nav">
      <ul>
        <li className="navbar-home">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-start">
          <Link to="/start-sequence">
            <Button text="Start" />
          </Link>
        </li>
        <li className="navbar-user">
          {
            isUserSignedIn
              ? <Link to="/sign-in">{userAuthUtils.getUserAuthUsername()}</Link>
              : <Link to="/sign-in">Sign in</Link>
          }
        </li>
      </ul>
    </div>
  );
}

export default Navbar;