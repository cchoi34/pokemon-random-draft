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
import SingleMoveCard from './basic-elements/SingleMoveCard';
import SingleAbilityCard from './basic-elements/SingleAbilityCard';
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
  ] = useState<YourPokemonDraftItemData | null>(null);
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

  function onSinglePokemonButtonClick(pokemon: YourPokemonDraftItemData) {
    setErrorMessage(null);
    if (singleChosenPokemon) {
      if (singleChosenPokemon.id === pokemon.id) {
        setSingleChosenPokemon(null);
      } else {
        setSingleChosenPokemon(pokemon);
      }
    } else {
      setSingleChosenPokemon(pokemon);
    }
  }

  function getSinglePokemonCardClasses(pokemon: YourPokemonDraftItemData) {
    if (singleChosenPokemon) {
      if (pokemon.id === singleChosenPokemon.id) {
        return 'edit-your-pokemon-pokemon-button edit-your-pokemon-selected';
      }
    }
    return 'edit-your-pokemon-pokemon-button';
  }

  function getAllPokemonToEditMarkup() {
    if (allPokemonToEdit.length === componentUtils.MAX_CHOSEN_POKEMON) {
      return (
        <div className="edit-your-pokemon-pokemon-list">
          {
            allPokemonToEdit.map((pokemon) => {
              return (
                <button 
                  type="button"
                  className={getSinglePokemonCardClasses(pokemon)}
                  onClick={(() => {
                    onSinglePokemonButtonClick(pokemon);
                  })}
                >
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

  function getAllMovesMarkup() {
    if (allMoveIDs.length > 0) {
      return (
        <div className="edit-your-pokemon-moves-list">
          {
            allMoveIDs.map((moveID) => {
              return (
                <SingleMoveCard moveID={moveID} />
              );
            })
          }
        </div>
      );
    }
    return <div />;
  }

  function getAllAbilitiesMarkup() {
    if (allAbilities.length > 0) {
      return (
        <div className="edit-your-pokemon-abilities-list">
          {
            allAbilities.map((ability) => {
              return (
                <SingleAbilityCard 
                  name={ability.name}
                  description={ability.description} 
                />
              );
            })
          }
        </div>
      );
    }
    return <div />;
  }

  function setSinglePokemonToEditToFirebase() {
    async function setSinglePokemonToEdit() {
      if (!singleChosenPokemon) {
        return;
      }
      const usersRef = db.collection(USERS_COLLECTION);
      const userID = userAuthUtils.getUserAuthToken();
      if (userID) {
        const userDoc = usersRef.doc(userID);
        const modifiedSingleChosenPokemon = {
          name: singleChosenPokemon.pokemonName,
          types: singleChosenPokemon.pokemonTypes,
          id: singleChosenPokemon.id,
        };
        userDoc.update({
          singlePokemonToEdit: modifiedSingleChosenPokemon,
        });
        setRedirect('/start-sequence/edit-single-pokemon');
      } else {
        setErrorMessage('Make sure you are signed in before progressing!');
      }
    }
    setSinglePokemonToEdit();
  }

  function onEditClick() {
    if (singleChosenPokemon) {
      setSinglePokemonToEditToFirebase();
    }
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
        <div className="edit-your-pokemon-abilities-container">
          <h3>Abilities</h3>
          { getAllAbilitiesMarkup() }
        </div>
        <div className="edit-your-pokemon-pokemon-container">
          <h3>Pokemon</h3>
          { getAllPokemonToEditMarkup() }
        </div>
        <div className="edit-your-pokemon-moves-container">
          <h3>Moves</h3>
          { getAllMovesMarkup() }
        </div>
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
                <Button text="Edit" onClick={onEditClick} />
              </div>
            ) 
            : (
              <div className="edit-your-pokemon-link-container edit-your-pokemon-inactive-element">
                <Button text="Edit" disabled={true} />
              </div>
            )
        }
      </div>
    </div>
  );
}

export default EditYourPokemon;