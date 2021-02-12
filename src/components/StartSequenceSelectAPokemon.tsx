import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { db, storage } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
import Button from './basic-elements/Button';
import '../styles/start-sequence.css';
import '../styles/text.css';

function StartSequenceSelectAPokemon() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="select-a-pokemon-container text-subheader">
      <div className="select-a-pokemon-banner-container">
        <p>Gen 3 | Legendaries | No hindering abilities | No wonder guard</p>
        <div className="select-a-pokemon-header">
          <h2>Select a Pokemon</h2>
          <p>Click a ball to find out what&apos;s inside!</p>
        </div>
        <div className="select-a-pokemon-your-pokemon">
          your pokemon
        </div>
      </div>
    </div>
  );
}

export default StartSequenceSelectAPokemon;