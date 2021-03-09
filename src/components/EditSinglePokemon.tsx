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
import '../styles/edit-single-pokemon.css';
import '../styles/text.css';
import { USERS_COLLECTION } from '../utils/firestoreUtils';
import { MOVES_PER_POKEMON } from '../utils/draftUtils';

function EditSinglePokemon() {
  const [isUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  const [redirect, setRedirect] = useState<string | null>(null);
  const [allAbilities, setAllAbilities] = useState<SingleAbilityWithIDData[]>([]);
  const [allMoves, setAllMoves] = useState<SingleMoveWithIDData[]>([]);
  const [allPokemonToEdit, setAllPokemonToEdit] = useState<SinglePokemonCardData[]>([]);
  const [
    singlePokemonToEdit, 
    setSinglePokemonToEdit,
  ] = useState<SinglePokemonCardData | null>(null);
  const [chosenAbility, setChosenAbility] = useState<SingleAbilityWithIDData | null>(null);
  const [chosenMoves, setChosenMoves] = useState<SingleMoveWithIDData[]>([]);
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

  function setChosenMovesAndAbilities(pokemonToEdit: SinglePokemonCardData) {
    if (pokemonToEdit.moves) {
      setChosenMoves(pokemonToEdit.moves);
    }
    if (pokemonToEdit.ability) {
      setChosenAbility(pokemonToEdit.ability);
    }
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
          const singlePokemonToEdit = data?.singlePokemonToEdit;
          const allPokemonToEdit = data?.pokemonToEdit;
          if (singlePokemonToEdit && abilitiesToEdit && movesToEdit) {
            setAllAbilities(abilitiesToEdit);
            setAllMoves(movesToEdit);
            setSinglePokemonToEdit(singlePokemonToEdit);
            setChosenMovesAndAbilities(singlePokemonToEdit);
            setAllPokemonToEdit(allPokemonToEdit);
          } else {
            setRedirect('/start-sequence');
          }
        }
      }
    }
    getAllEditPokemonDataFromFirebase();
  }

  function getSingleMoveCardClasses(move: SingleMoveWithIDData) {
    const chosenMoveIDs = chosenMoves.map((chosenMove) => {
      return chosenMove.id;
    });
    if (move.used) {
      return 'edit-single-pokemon-move-button edit-single-pokemon-move-used';
    } 
    if (chosenMoveIDs.includes(move.id)) {
      return 'edit-single-pokemon-move-button edit-single-pokemon-move-selected';
    }
    return 'edit-single-pokemon-move-button';
  }

  function getSingleAbilityCardClasses(ability: SingleAbilityWithIDData) {
    if (ability.used) {
      return 'edit-single-pokemon-ability-button edit-single-pokemon-ability-used';
    }
    if (ability.id === chosenAbility?.id) {
      return 'edit-single-pokemon-ability-button edit-single-pokemon-ability-selected';
    }
    return 'edit-single-pokemon-ability-button';
  }

  function onSingleMoveClick(move: SingleMoveWithIDData) {
    if (move.used) {
      return;
    }
    const chosenMoveIDs = chosenMoves.map((chosenMove) => {
      return chosenMove.id;
    });
    const isMoveChosen = chosenMoveIDs.includes(move.id);
    setErrorMessage(null);
    if (isMoveChosen) {
      const newChosenMoves = chosenMoves.filter((chosenMove) => {
        return chosenMove.id !== move.id;
      });
      setChosenMoves(newChosenMoves);
    } else if (chosenMoves.length >= MOVES_PER_POKEMON) {
      setErrorMessage('Please make sure to select no more 4 moves!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } else {
      const newChosenMoves = [...chosenMoves, move];
      setChosenMoves(newChosenMoves);
    }
  }

  function onSingleAbilityClick(ability: SingleAbilityWithIDData) {
    if (ability.used) {
      return;
    }
    if (chosenAbility) {
      if (ability.id === chosenAbility.id) {
        setChosenAbility(null);
      } else {
        setChosenAbility(ability);
      }
    } else {
      setChosenAbility(ability);
    }
  }

  function getSinglePokemonToEditMarkup() {
    if (singlePokemonToEdit) {
      return (
        <div className="edit-single-pokemon-pokemon-list">
          <SinglePokemonCard 
            pokemonName={singlePokemonToEdit.pokemonName}
            pokemonTypes={singlePokemonToEdit.pokemonTypes}
            id={singlePokemonToEdit.id}
            moves={chosenMoves}
            ability={chosenAbility}
          />
        </div>
      );
    } 
    return <div />;
  }

  function getAllMovesMarkup() {
    if (allMoves.length > 0) {
      return (
        <div className="edit-single-pokemon-moves-list">
          {
            allMoves.map((move) => {
              return (
                <button 
                  key={move.id}
                  type="button"
                  className={getSingleMoveCardClasses(move)}
                  onClick={(() => {
                    onSingleMoveClick(move);
                  })}
                >
                  <SingleMoveCard 
                    move={move.move} 
                    used={move.used} 
                    id={move.id}
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

  function getAllAbilitiesMarkup() {
    if (allAbilities.length > 0) {
      return (
        <div className="edit-single-pokemon-abilities-list">
          {
            allAbilities.map((ability) => {
              return (
                <button 
                  key={ability.id}
                  type="button"
                  className={getSingleAbilityCardClasses(ability)}
                  onClick={(() => {
                    onSingleAbilityClick(ability);
                  })}
                >
                  <SingleAbilityCard 
                    name={ability.name}
                    description={ability.description} 
                    used={ability.used}
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

  function getNewAbilitiesToEdit(
    ability: SingleAbilityWithIDData, 
    abilitiesToEdit: SingleAbilityWithIDData[],
  ): SingleAbilityWithIDData[] {
    return abilitiesToEdit.map((abilityToEdit) => {
      if (ability.id === abilityToEdit.id) {
        return {
          name: ability.name,
          description: ability.description,
          id: ability.id,
          used: true,
        };
      }
      return abilityToEdit;
    });
  }

  function getNewMovesToEdit(
    moves: SingleMoveWithIDData[], 
    movesToEdit: SingleMoveWithIDData[],
  ): SingleMoveWithIDData[] {
    const moveIDs = moves.map((move) => {
      return move.id;
    });
    return movesToEdit.map((moveToEdit) => {
      if (moveIDs.includes(moveToEdit.id)) {
        return {
          move: moveToEdit.move,
          id: moveToEdit.id,
          used: true,
        };
      }
      return moveToEdit;
    });
  }

  function getNewPokemonToEdit(
    pokemonToSave: SinglePokemonCardData,
    pokemonToEdit: SinglePokemonCardData[],
  ) {
    return pokemonToEdit.map((item) => {
      if (pokemonToSave.id === item.id) {
        return pokemonToSave;
      }
      return item;
    });
  }

  function updatePokemonToEditToFirebase(pokemonToSave: SinglePokemonCardData) {
    async function updatePokemonToEdit() {
      if (!chosenAbility || chosenMoves.length !== MOVES_PER_POKEMON || !singlePokemonToEdit) {
        return;
      }
      const usersRef = db.collection(USERS_COLLECTION);
      const userID = userAuthUtils.getUserAuthToken();
      if (userID) {
        const userDoc = usersRef.doc(userID);
        const totalMoves = componentUtils.MAX_SELECTED_DRAFT_POKEMON * MOVES_PER_POKEMON;
        if (allAbilities.length === componentUtils.MAX_SELECTED_DRAFT_POKEMON) {
          const newAbilitiesToEdit = getNewAbilitiesToEdit(chosenAbility, allAbilities);
          await userDoc.update({
            abilitiesToEdit: newAbilitiesToEdit,
          });
        }
        if (allMoves.length === totalMoves) {
          const newMovesToEdit = getNewMovesToEdit(chosenMoves, allMoves);
          await userDoc.update({
            movesToEdit: newMovesToEdit,
          });
        }
        if (allPokemonToEdit.length === componentUtils.MAX_CHOSEN_POKEMON) {
          const newPokemonToEdit = getNewPokemonToEdit(
            pokemonToSave, 
            allPokemonToEdit,
          );
          await userDoc.update({
            pokemonToEdit: newPokemonToEdit,
          });
        }
        setRedirect('/start-sequence/edit-your-pokemon');
      }
    }
    updatePokemonToEdit();
  }

  function onSaveClick() {
    if (chosenAbility && chosenMoves.length === MOVES_PER_POKEMON && singlePokemonToEdit) {
      const pokemonToSave: SinglePokemonCardData = {
        pokemonName: singlePokemonToEdit.pokemonName,
        pokemonTypes: singlePokemonToEdit.pokemonTypes,
        moves: chosenMoves,
        ability: chosenAbility,
        id: singlePokemonToEdit.id,
      };
      updatePokemonToEditToFirebase(pokemonToSave);
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
    <div className="edit-single-pokemon-container text-subheader">
      <StartSequenceBanner
        header="Choose an Ability and Moveset"
        subheader="Select available ability and 4 available moves for the Pokemon."
        presets={presets}
      />
      <div className="edit-single-pokemon-error-message">
        {
          errorMessage && <ErrorMessage message={errorMessage} />
        }
      </div>
      <div className="edit-single-pokemon-items">
        <div className="edit-single-pokemon-abilities-container">
          <h3>Abilities</h3>
          { getAllAbilitiesMarkup() }
        </div>
        <div className="edit-single-pokemon-pokemon-container">
          <h3>Pokemon</h3>
          { getSinglePokemonToEditMarkup() }
        </div>
        <div className="edit-single-pokemon-moves-container">
          <h3>Moves</h3>
          { getAllMovesMarkup() }
        </div>
      </div>
      <div className="edit-single-pokemon-button-container">
        <div className="edit-single-pokemon-link-container">
          <Link to="/start-sequence/edit-your-pokemon">
            <Button text="Back" />
          </Link>
        </div>
        {
          chosenAbility !== null && chosenMoves.length === MOVES_PER_POKEMON
            ? (
              <div className="edit-single-pokemon-link-container">
                <Button text="Save" onClick={onSaveClick} />
              </div>
            ) 
            : (
              <div className="edit-single-pokemon-link-container edit-single-pokemon-inactive-element">
                <Button text="Save" disabled={true} />
              </div>
            )
        }
      </div>
    </div>
  );
}

export default EditSinglePokemon;