import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import Button from './basic-elements/Button';
import '../styles/sign-in.css';
import '../styles/text.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(userAuthUtils.isUserSignedIn());

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }

  function onSignInClick() {
    async function getUserData() {
      const usersRef = db.collection('users');
      const maybeUser = await usersRef.where('username', '==', username).where('password', '==', password).get();
      if (maybeUser.empty) {
        userAuthUtils.clearLocalStorage();
      } else {
        maybeUser.forEach((user) => {
          userAuthUtils.setUserAuthToken(user.id, username);
          setIsUserSignedIn(userAuthUtils.isUserSignedIn());
        });
        location.reload();
      }
    }
    getUserData();
  }

  function onLogOutClick() {
    userAuthUtils.clearLocalStorage();
    setIsUserSignedIn(userAuthUtils.isUserSignedIn() !== null);
    location.reload();
  }

  return (
    <div className="sign-in-container text-subheader">
      <div className="sign-in-card">
        <h2>Sign in</h2>
        <div className="sign-in-form-elements text-eyebrow">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" onChange={onChange} />
        </div>
        <div className="sign-in-form-elements text-eyebrow">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" onChange={onChange} />
        </div>
        <div className="sign-in-button">
          {
            isUserSignedIn 
              ? <Button text="Log out" onClick={onLogOutClick} /> 
              : <Button text="Sign in" onClick={onSignInClick} />
          }
        </div>
        <div className="sign-in-create-account text-paragraph">
          <p>Don&#39;t have an account?</p>
          <Link to="/create-account">Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;