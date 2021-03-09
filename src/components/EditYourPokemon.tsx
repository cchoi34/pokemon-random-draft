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
  SingleMoveWithIDData,
  SingleAbilityWithIDData,
} from '../utils/dataTypes';
import StartSequenceBanner from './basic-elements/StartSequenceBanner';
import SinglePokemonCard from './basic-elements/SinglePokemonCard';
import SingleMoveCard from './basic-elements/SingleMoveCard';
import SingleAbilityCard from './basic-elements/SingleAbilityCard';
import ErrorMessage from './basic-elements/ErrorMessage';
import Button from './basic-elements/Button';
import '../styles/edit-your-pokemon.css';
import '../styles/text.css';
import { POKEMON_MOVES_COLLECTION, USERS_COLLECTION } from '../utils/firestoreUtils';
import { MOVES_PER_POKEMON } from '../utils/draftUtils';

function EditYourPokemon() {
  const [isUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  const [redirect, setRedirect] = useState<string | null>(null);
  const [allAbilities, setAllAbilities] = useState<SingleAbilityWithIDData[]>([]);
  const [allMoves, setAllMoves] = useState<SingleMoveWithIDData[]>([]);
  const [allPokemonToEdit, setAllPokemonToEdit] = useState<SinglePokemonCardData[]>([]);
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

  function getAllEditPokemonData() {
    async function getAllEditPokemonDataFromFirebase() {
      const usersRef = db.collection(USERS_COLLECTION);
      const userID = userAuthUtils.getUserAuthToken();
      if (userID) {
        const doc = await usersRef.doc(userID).get();
        if (doc.exists) {
          const data = doc.data();
          const abilitiesToEdit = data?.abilitiesToEdit;
          const movesToEdit = data?.movesToEdit;
          const pokemonToEdit = data?.pokemonToEdit;
          if (pokemonToEdit && abilitiesToEdit && movesToEdit) {
            setAllAbilities(abilitiesToEdit);
            setAllMoves(movesToEdit);
            setAllPokemonToEdit(pokemonToEdit);
          } else {
            setRedirect('/start-sequence');
          }
        }
      }
    }
    getAllEditPokemonDataFromFirebase();
  }

  function checkAllPokemonToEdit(): boolean {
    let allPokemonHaveMovesAndAbilities = true;
    allPokemonToEdit.forEach((item) => {
      if (item.moves) {
        if (item.moves.length !== MOVES_PER_POKEMON) {
          allPokemonHaveMovesAndAbilities = false;
        }
      } else {
        allPokemonHaveMovesAndAbilities = false;
      }
      if (!item.abilityName) {
        allPokemonHaveMovesAndAbilities = false;
      }
      if (!item.abilityDescription) {
        allPokemonHaveMovesAndAbilities = false;
      }
    });
    return allPokemonHaveMovesAndAbilities;
  }

  function onSinglePokemonButtonClick(pokemon: SinglePokemonCardData) {
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

  function getSinglePokemonCardClasses(pokemon: SinglePokemonCardData) {
    if (singleChosenPokemon) {
      if (pokemon.id === singleChosenPokemon.id) {
        return 'edit-your-pokemon-pokemon-button edit-your-pokemon-pokemon-selected';
      }
    }
    return 'edit-your-pokemon-pokemon-button';
  }

  function getSingleAbilityCardClasses(ability: SingleAbilityWithIDData) {
    if (ability.used) {
      return 'edit-your-pokemon-ability-button edit-your-pokemon-ability-used';
    }
    return 'edit-your-pokemon-ability-button';
  }

  function getSingleMoveCardClasses(move: SingleMoveWithIDData) {
    if (move.used) {
      return 'edit-your-pokemon-move-button edit-your-pokemon-move-used';
    } 
    return 'edit-your-pokemon-move-button';
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
                    id={pokemon.id}
                    moves={pokemon.moves}
                    abilityName={pokemon.abilityName}
                    abilityDescription={pokemon.abilityDescription}
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
    if (allMoves.length > 0) {
      return (
        <div className="edit-your-pokemon-moves-list">
          {
            allMoves.map((move) => {
              return (
                <div 
                  className={getSingleMoveCardClasses(move)}
                  key={move.id}>
                  <SingleMoveCard 
                    moveID={move.moveID} 
                    used={move.used} 
                  />
                </div>
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
                <div 
                  className={getSingleAbilityCardClasses(ability)}
                  key={ability.id}>
                  <SingleAbilityCard 
                    name={ability.name}
                    description={ability.description} 
                    used={ability.used}
                  />
                </div>
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

        const modifiedSingleChosenPokemon: SinglePokemonCardData = {
          pokemonName: singleChosenPokemon.pokemonName,
          pokemonTypes: singleChosenPokemon.pokemonTypes,
          id: singleChosenPokemon.id,
          moves: singleChosenPokemon.moves || [],
          abilityName: singleChosenPokemon.abilityName || '',
          abilityDescription: singleChosenPokemon.abilityDescription || '',
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

  function onFinishClick() {
    if (checkAllPokemonToEdit()) {
      setRedirect('/start-sequence/final-team');
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
        {
          checkAllPokemonToEdit()
            ? (
              <div className="edit-your-pokemon-link-container">
                <Button text="Finish" onClick={onFinishClick} />
              </div>
            ) 
            : (
              <div className="edit-your-pokemon-link-container edit-your-pokemon-inactive-element">
                <Button text="Finish" disabled={true} />
              </div>
            )
        }
      </div>
    </div>
  );
}

export default EditYourPokemon;