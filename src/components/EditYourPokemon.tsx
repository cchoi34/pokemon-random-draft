import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { db } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
import { 
  SelectedPokemonData, 
  PresetBannerData, 
  YourPokemonDraftItemData, 
  SingleAbilityData, 
  SingleMoveData, 
  SinglePokemonCardData,
} from '../utils/dataTypes';
import StartSequenceBanner from './basic-elements/StartSequenceBanner';
import SinglePokemonCard from './basic-elements/SinglePokemonCard';
import ErrorMessage from './basic-elements/ErrorMessage';
import Button from './basic-elements/Button';
import '../styles/edit-your-pokemon.css';
import '../styles/text.css';
import { USERS_COLLECTION } from '../utils/firestoreUtils';

function EditYourPokemon() {
  const [isUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  const [redirect, setRedirect] = useState<string | null>(null);
  const [allAbilities, setAllAbilities] = useState<SingleAbilityData[]>([]);
  const [allMoveIDs, setAllMoveIDs] = useState<number[]>([]);
  const [allPokemonToEdit, setAllPokemonToEdit] = useState<YourPokemonDraftItemData[]>([]);
  const [
    singleChosenPokemon, 
    setSingleChosenPokemon,
  ] = useState<SinglePokemonCardData | null>(null);
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

  function setDataFromAllDraftItems(draftItems: YourPokemonDraftItemData[]) {
    const abilities: SingleAbilityData[] = draftItems.map((item) => {
      return {
        name: item.abilityName,
        description: item.abilityDescription,
      };
    });
    const groupedMoves = draftItems.map((item) => {
      return item.moveIDs;
    });
    const moves: number[] = [];
    groupedMoves.forEach((setOfMoves) => {
      setOfMoves.forEach((moveID) => {
        moves.push(moveID);
      });
    });
    setAllAbilities(abilities);
    setAllMoveIDs(moves);
  }

  function getAllEditPokemonData() {
    async function getAllEditPokemonDataFromFirebase() {
      const usersRef = db.collection(USERS_COLLECTION);
      const userID = userAuthUtils.getUserAuthToken();
      if (userID) {
        const doc = await usersRef.doc(userID).get();
        if (doc.exists) {
          const data = doc.data();
          const draftItems = data?.yourPokemonDraftItems;
          const pokemonToEdit = data?.pokemonToEdit;
          if (draftItems && pokemonToEdit) {
            setDataFromAllDraftItems(draftItems);
            setAllPokemonToEdit(pokemonToEdit);
          } else {
            setRedirect('/start-sequence');
          }
        }
      }
    }
    getAllEditPokemonDataFromFirebase();
  }

  function getAllPokemonToEditMarkup() {
    if (allPokemonToEdit.length === componentUtils.MAX_CHOSEN_POKEMON) {
      return (
        <div className="edit-your-pokemon-pokemon-container">
          <h3>Pokemon</h3>
          {
            allPokemonToEdit.map((pokemon) => {
              return (
                <button 
                  type="button"
                  className="edit-your-pokemon-pokemon-button">
                  <SinglePokemonCard 
                    pokemonName={pokemon.pokemonName}
                    pokemonTypes={pokemon.pokemonTypes}
                  />
                </button>
              );
            })
          }
        </div>
      );
    } 
    return <div />;
  }

  useEffect(() => {
    if (!isUserSignedIn) {
      setRedirect('/sign-in');
    }
    getPresets();
    getAllEditPokemonData();
  }, []);

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="edit-your-pokemon-container text-subheader">
      <StartSequenceBanner
        header="Choose a Pokemon to Edit"
        subheader="Select a Pokemon to choose abilities and moves for."
        presets={presets}
      />
      <div className="edit-your-pokemon-error-message">
        {
          errorMessage && <ErrorMessage message={errorMessage} />
        }
      </div>
      <div className="edit-your-pokemon-items">
        {
          getAllPokemonToEditMarkup()
        }
      </div>
      <div className="edit-your-pokemon-button-container">
        <div className="edit-your-pokemon-link-container">
          <Link to="/start-sequence/choose-your-pokemon">
            <Button text="Back" />
          </Link>
        </div>
        {
          singleChosenPokemon !== null
            ? (
              <div className="edit-your-pokemon-link-container">
                <Link to="/start-sequence/edit-your-pokemon">
                  <Button text="Next" />
                </Link>
              </div>
            ) 
            : (
              <div className="edit-your-pokemon-link-container edit-your-pokemon-inactive-element">
                <Button text="Next" disabled={true} />
              </div>
            )
        }
      </div>
    </div>
  );
}

export default EditYourPokemon;