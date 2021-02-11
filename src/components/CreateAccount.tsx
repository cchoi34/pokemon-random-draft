import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import Button from './basic-elements/Button';
import '../styles/create-account.css';
import '../styles/text.css';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [isUsernameTaken, setIsUsernameTaken] = useState<boolean>();
  const [isUsernameLengthValid, setIsUserNameLengthValid] = useState<boolean>(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [doPasswordsMatch, setDoPasswordsMatch] = useState<boolean>(true);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState<boolean>(true);
  const [isUserSignedIn, setIsUserSignedIn] = useState(userAuthUtils.isUserSignedIn());

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'username') {
      setIsUsernameTaken(false);
      setUsername(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
    if (event.target.name === 'confirm-password') {
      setConfirmPassword(event.target.value);
    }
  }

  function validatePassword() {
    if (password !== confirmPassword) {
      setDoPasswordsMatch(false);
      return false;
    }
    if (password.length <= 5) {
      setIsPasswordLengthValid(false);
      return false;
    }
    return true;
  }

  function validateUsername() {
    if (username.length <= 5) {
      setIsUserNameLengthValid(false);
      return false;
    }
    return true;
  }

  function onCreateAccountClick() {
    async function createUserData() {
      const usersRef = db.collection('users');
      const maybeUser = await usersRef.where('username', '==', username).get();
      if (maybeUser.empty) {
        setIsUsernameTaken(false);
        const data = {
          username,
          password,
        };
        const newUserRef = usersRef.doc();
        await newUserRef.set(data);
        const newUser = await newUserRef.get();
        userAuthUtils.setUserAuthToken(newUser.id, username);
        setIsUserSignedIn(userAuthUtils.isUserSignedIn());
        location.reload();
      } else {
        setIsUsernameTaken(true);
      }
    }
    const validPassword = validatePassword();
    const validUsername = validateUsername();
    if (validPassword && validUsername) {
      createUserData();
    } 
  }

  function generateFormErrorMessage(message: string) {
    return <p className="create-account-error-message">{message}</p>;
  }

  function generateCreateAccountCard() {
    return (
      <div className="create-account-card">
        <h2>Create Account</h2>
        <div className="create-account-form-elements text-eyebrow">
          {
            isUsernameTaken && generateFormErrorMessage('username is already taken')
          }
          {
            !isUsernameLengthValid && generateFormErrorMessage('username must be longer than 5 characters')
          }
          <label htmlFor="username">Choose a username</label>
          <input type="text" name="username" id="username" onChange={onChange} />
        </div>
        <div className="create-account-form-elements text-eyebrow">
          {
            !doPasswordsMatch && generateFormErrorMessage('passwords must match')
          }
          {
            !isPasswordLengthValid && generateFormErrorMessage('password must be longer than 5 characters')
          }
          <label htmlFor="password">Choose a password</label>
          <input type="text" name="password" id="password" onChange={onChange} />
        </div>
        <div className="create-account-form-elements text-eyebrow">
          <label htmlFor="password">Confirm password</label>
          <input type="text" name="confirm-password" id="confirm-password" onChange={onChange} />
        </div>
        <div className="create-account-button">
          <Button text="Create account" onClick={onCreateAccountClick} /> 
        </div>
        <div className="create-account-sign-in text-paragraph">
          <p>Already have an account?</p>
          <Link to="/sign-in">Sign in</Link>
        </div>
      </div> 
    );
  }

  return (
    <div className="create-account-container text-subheader">
      {
        isUserSignedIn 
          ? <h2>Welcome {userAuthUtils.getUserAuthUsername()}!</h2> 
          : generateCreateAccountCard()     
        }
    </div>
  );
}

export default CreateAccount;