import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { db, storage } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
import Button from './basic-elements/Button';
import '../styles/start-sequence.css';
import '../styles/text.css';

enum PokemonGenerations {
  GEN_THREE = 'gen-3',
}

enum DraftPresetCategories {
  GENERATION = 'generation',
  LEGENDARIES = 'legendaries',
  HINDERING_ABILITIES = 'hindering-abilities',
  WONDER_GUARD = 'wonder-guard',
}

function StartSequenceDraftPresets() {
  const [generation, setGeneration] = useState<string>(PokemonGenerations.GEN_THREE);
  const [legendaries, setLegendaries] = useState(true);
  const [hinderingAbilities, setHinderingAbilities] = useState(false);
  const [wonderGuard, setWonderGuard] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    function getValue(value: string) {
      return value === 'allowed';
    }

    switch (event.target.name) {
      case DraftPresetCategories.GENERATION: 
        setGeneration(event.target.value);
        break;
      case DraftPresetCategories.LEGENDARIES:
        setLegendaries(getValue(event.target.value));
        break;
      case DraftPresetCategories.HINDERING_ABILITIES:
        setHinderingAbilities(getValue(event.target.value));
        break;
      case DraftPresetCategories.WONDER_GUARD:
        setWonderGuard(getValue(event.target.value));
        break;
      default:
        break;
    }
  }

  function onStartDraftClick() {
    const userToken = userAuthUtils.getUserAuthToken();
    async function getUserDraftData() {
      if (userToken !== null) {
        setIsUserSignedIn(true);
        const usersRef = db.collection('users');
        const userDoc = usersRef.doc(userToken);
        const draftPresets = {
          generation,
          legendaries,
          hinderingAbilities,
          wonderGuard,
        };
        userDoc.update({
          currentDraftPresets: draftPresets,
          currentDraftStarted: true,
          currentDraftItems: [],
        });
        setRedirect('/start-sequence/select-a-pokemon');
      } else {
        console.log('please sign in before starting a draft!');
        setIsUserSignedIn(false);
      }
    }
    getUserDraftData();
  }

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="draft-presets-container text-subheader">
      <div className="draft-presets-card">
        <h2>Draft Presets</h2>
        <div className="draft-presets-form-element text-eyebrow">
          <label htmlFor="generation">Generation</label>
          <select name="generation" id="generation" onChange={onChange}>
            <option value={PokemonGenerations.GEN_THREE}>Generation 3</option>
          </select>
        </div>
        <div className="draft-presets-form-element text-eyebrow">
          <label htmlFor="legendaries">Legendaries</label>
          <select name="legendaries" id="legendaries" defaultValue="allowed" onChange={onChange}>
            <option value="allowed">Allowed</option>
            <option value="not-allowed">Not allowed</option>
          </select>
        </div>
        <div className="draft-presets-form-element text-eyebrow">
          <label htmlFor="hindering-abilities">Hindering abilities</label>
          <select name="hindering-abilities" id="hindering-abilities" defaultValue="not-allowed" onChange={onChange}>
            <option value="allowed">Allowed</option>
            <option value="not-allowed">Not allowed</option>
          </select>
        </div>
        <div className="draft-presets-form-element text-eyebrow">
          <label htmlFor="wonder-guard">Wonder guard</label>
          <select name="wonder-guard" id="wonder-guard" defaultValue="not-allowed" onChange={onChange}>
            <option value="allowed">Allowed</option>
            <option value="not-allowed">Not allowed</option>
          </select>
        </div>
        <div className="draft-presets-button">
          <Button text="Start Draft" onClick={onStartDraftClick} />
        </div>
        {
          !isUserSignedIn && componentUtils.generateFormErrorMessage('Please sign in before starting')
        }
      </div>
    </div>
  );
}

export default StartSequenceDraftPresets;