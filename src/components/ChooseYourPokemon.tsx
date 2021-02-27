import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { db } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
import { SelectedPokemonData, PresetBannerData, YourPokemonDraftItemData } from '../utils/dataTypes';
import StartSequenceBanner from './basic-elements/StartSequenceBanner';
import PokemonPreviewCard from './basic-elements/PokemonPreviewCard';
import ErrorMessage from './basic-elements/ErrorMessage';
import Button from './basic-elements/Button';
import '../styles/choose-your-pokemon.css';
import '../styles/text.css';
import { USERS_COLLECTION } from '../utils/firestoreUtils';

function ChooseYourPokemon() {
  const [isUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  const [redirect, setRedirect] = useState<string | null>(null);
  const [
    yourPokemonDraftItems, 
    setYourPokemonDraftItems,
  ] = useState<YourPokemonDraftItemData[]>([]);
  const [chosenPokemon, setChosenPokemon] = useState<YourPokemonDraftItemData[]>([]);
  const [chosenPokemonIndexes, setChosenPokemonIndexes] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  function getYourPokemonDraftItems() {
    async function getYourPokemonDraftItemsFromFirebase() {
      const usersRef = db.collection(USERS_COLLECTION);
      const userID = userAuthUtils.getUserAuthToken();
      if (userID) {
        const doc = await usersRef.doc(userID).get();
        if (doc.exists) {
          const data = doc.data();
          const draftItems = data?.yourPokemonDraftItems;
          if (draftItems) {
            if (draftItems.length === componentUtils.MAX_SELECTED_DRAFT_POKEMON) {
              setYourPokemonDraftItems(draftItems);
            }  
          } else {
            setRedirect('/start-sequence');
          }
        }
      }
    }
    getYourPokemonDraftItemsFromFirebase();
  }

  function onPreviewCardClick(item: YourPokemonDraftItemData, index: number) {
    setErrorMessage(null);
    if (chosenPokemon.includes(item)) {
      const newChosenPokemon = chosenPokemon.filter((pokemon) => {
        return pokemon.id !== index;
      });
      const newChosenPokemonIndexes = chosenPokemonIndexes.filter((chosenIndex) => {
        return index !== chosenIndex;
      });
      setChosenPokemon(newChosenPokemon);
      setChosenPokemonIndexes(newChosenPokemonIndexes);
    } else if (chosenPokemon.length < componentUtils.MAX_CHOSEN_POKEMON) {
      const newChosenPokemon = [...chosenPokemon, item];
      const newChosenPokemonIndexes = [...chosenPokemonIndexes, index];
      setChosenPokemon(newChosenPokemon);
      setChosenPokemonIndexes(newChosenPokemonIndexes);
    } else if (chosenPokemon.length >= componentUtils.MAX_CHOSEN_POKEMON) {
      setErrorMessage('Please make sure to select no more than 6 Pokemon!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }

  function getPreviewCardClasses(index: number): string {
    const chosen = chosenPokemonIndexes.includes(index);
    if (chosen) {
      return 'choose-your-pokemon-preview-card-container choose-your-pokemon-chosen-item';
    }
    return 'choose-your-pokemon-preview-card-container';
  }

  useEffect(() => {
    if (!isUserSignedIn) {
      setRedirect('/sign-in');
    }
    getPresets();
    getYourPokemonDraftItems();
  }, []);

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="choose-your-pokemon-container text-subheader">
      <StartSequenceBanner
        header="Choose your 6 Pokemon"
        subheader="Don't worry, you can still pick abilities and moves from a Pokemon not chosen."
        presets={presets}
      />
      <div className="choose-your-pokemon-error-message">
        {
          errorMessage && <ErrorMessage message={errorMessage} />
        }
      </div>
      <div className="choose-your-pokemon-items">
        {
          yourPokemonDraftItems && yourPokemonDraftItems.map((item, index) => {
            return (
              <button 
                key={index}
                type="button" 
                className={getPreviewCardClasses(index)} 
                onClick={() => {
                  onPreviewCardClick(item, index);
                }}>
                <PokemonPreviewCard 
                  pokemonName={item.pokemonName}
                  pokemonTypes={item.pokemonTypes}
                  moves={item.moves}
                  abilityName={item.abilityName}
                  abilityDescription={item.abilityDescription}
                  color="blue"
                />
              </button>
            );
          })
        }
      </div>
      <div className="choose-your-pokemon-button-container">
        <div className="choose-your-pokemon-link-container">
          <Link to="/start-sequence/your-pokemon">
            <Button text="Back" />
          </Link>
        </div>
        {
          chosenPokemon.length === componentUtils.MAX_CHOSEN_POKEMON 
            ? (
              <div className="choose-your-pokemon-link-container">
                <Link to="/start-sequence/edit-your-pokemon">
                  <Button text="Next" />
                </Link>
              </div>
            ) 
            : (
              <div className="choose-your-pokemon-link-container choose-your-pokemon-inactive-element">
                <Button text="Next" disabled={true} />
              </div>
            )
        }
      </div>
    </div>
  );
}

export default ChooseYourPokemon;