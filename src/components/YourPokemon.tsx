import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { db } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
import { SelectedPokemonData, PresetBannerData } from '../utils/dataTypes';
import StartSequenceBanner from './basic-elements/StartSequenceBanner';
import PokemonPreviewCard from './basic-elements/PokemonPreviewCard';
import Button from './basic-elements/Button';
import '../styles/your-pokemon.css';
import '../styles/text.css';
import { USERS_COLLECTION } from '../utils/firestoreUtils';

function YourPokemon() {
  const [isUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  const [redirect, setRedirect] = useState<string | null>(null);
  const [allSelectedPokemon, setAllSelectedPokemon] = useState<SelectedPokemonData[]>([]);
  const [presets, setPresets] = useState<PresetBannerData>({
    generation: '',
    legendaries: true,
    hinderingAbilities: false,
    wonderGuard: false,
  });

  function getPresets() {
    async function getPresetsFromFirebase() {
      const usersRef = db.collection(USERS_COLLECTION);
      const userID = userAuthUtils.getUserAuthToken();
      if (userID) {
        const doc = await usersRef.doc(userID).get();
        if (doc.exists) {
          const data = doc.data();
          if (data) {
            setPresets(data.currentDraftPresets);
          }
        }
      }
    }
    getPresetsFromFirebase();
  }

  function getAllSelectedPokemon() {
    async function getAllSelectedPokemonFromFirebase() {
      const usersRef = db.collection(USERS_COLLECTION);
      const userID = userAuthUtils.getUserAuthToken();
      if (userID) {
        const doc = await usersRef.doc(userID).get();
        if (doc.exists) {
          const data = doc.data();
          const draftItems = data?.currentDraftItems;
          if (
            draftItems.length < componentUtils.MAX_SELECTED_DRAFT_POKEMON 
            && draftItems.length > 0
          ) {
            setRedirect('/start-sequence/select-a-pokemon');
          } else if (!draftItems || draftItems.length === 0) {
            setRedirect('/start-sequence');
          } else if (draftItems.length === componentUtils.MAX_SELECTED_DRAFT_POKEMON) {
            setAllSelectedPokemon(draftItems);
          }    
        }
      }
    }
    getAllSelectedPokemonFromFirebase();
  }

  useEffect(() => {
    if (!isUserSignedIn) {
      setRedirect('/sign-in');
    }
    getPresets();
    getAllSelectedPokemon();
  }, []);

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="your-pokemon-container text-subheader">
      <StartSequenceBanner
        header="Your Pokemon"
        subheader="A preview of your drafted pokemon - Proceed when ready."
        presets={presets}
      />
      <div className="your-pokemon-items">
        {
          allSelectedPokemon && allSelectedPokemon.map((item) => {
            return (
              <PokemonPreviewCard 
                pokemonName={item.pokemonName}
                pokemonTypes={item.pokemonTypes}
                moves={item.moves}
                abilityName={item.abilityName}
                abilityDescription={item.abilityDescription}
                color="blue"
              />
            );
          })
        }
      </div>
      <div className="your-pokemon-button-container">
        <Link to="/start-sequence/choose-your-pokemon">
          <Button text="Next" />
        </Link>
      </div>
    </div>
  );
}

export default YourPokemon;