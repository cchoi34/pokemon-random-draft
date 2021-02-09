import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './basic-elements/Button';
import '../styles/sign-in.css';
import '../styles/text.css';

function onSignInClick() {
  console.log('clicked!');
}

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="sign-in-container text-subheader">
      <div className="sign-in-card">
        <h2>Sign in</h2>
        <div className="sign-in-form-elements text-eyebrow">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="sign-in-form-elements text-eyebrow">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <div className="sign-in-button">
          <Button text="Sign in" onClick={onSignInClick} />
        </div>
        <div className="sign-in-create-account text-paragraph">
          <p>Don&#39;t have an account?</p>
          <Link to="/sign-in">Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;