import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { db } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
import { PresetBannerData, SinglePokemonCardData, YourPokemonDraftItemData } from '../utils/dataTypes';
import StartSequenceBanner from './basic-elements/StartSequenceBanner';
import SinglePokemonCard from './basic-elements/SinglePokemonCard';
import ExportModal from './basic-elements/ExportModal';
import Button from './basic-elements/Button';
import '../styles/final-team.css';
import '../styles/text.css';
import { USERS_COLLECTION } from '../utils/firestoreUtils';
import { MOVES_PER_POKEMON } from '../utils/draftUtils';

function FinalTeam() {
  const [isUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  const [redirect, setRedirect] = useState<string | null>(null);
  const [finalTeam, setFinalTeam] = useState<SinglePokemonCardData[]>([]);
  const [exportItems, setExportItems] = useState<boolean>(false);
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

  function getFinalTeamData() {
    async function getAllEditPokemonDataFromFirebase() {
      const usersRef = db.collection(USERS_COLLECTION);
      const userID = userAuthUtils.getUserAuthToken();
      if (userID) {
        const doc = await usersRef.doc(userID).get();
        if (doc.exists) {
          const data = doc.data();
          const pokemonToEdit = data?.pokemonToEdit;
          if (pokemonToEdit) {
            setFinalTeam(pokemonToEdit);
          } else {
            setRedirect('/start-sequence');
          }
        }
      }
    }
    getAllEditPokemonDataFromFirebase();
  }

  function getFinalTeamMarkup() {
    if (finalTeam.length === componentUtils.MAX_CHOSEN_POKEMON) {
      return (
        <div className="final-team-pokemon-list">
          {
            finalTeam.map((pokemon) => {
              return (
                <SinglePokemonCard
                  key={pokemon.id}
                  pokemonName={pokemon.pokemonName}
                  pokemonTypes={pokemon.pokemonTypes}
                  id={pokemon.id}
                  moves={pokemon.moves}
                  abilityName={pokemon.abilityName}
                  abilityDescription={pokemon.abilityDescription}
                />
              );
            })
          }
        </div>
      );
    } 
    return <div />;
  }

  function checkAllPokemonToEdit(): boolean {
    let allPokemonHaveMovesAndAbilities = true;
    finalTeam.forEach((item) => {
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

  // function getDataForExportModal(): YourPokemonDraftItemData[] {
  //   const finalTeamToExport = [];
  //   if (finalTeam.length === componentUtils.MAX_CHOSEN_POKEMON) {
  //     finalTeam.forEach((item) => {
  //       const pokemon = {
  //         id: item.id,
  //         pokemonID: item.id,
  //         pokemonName: item.pokemonName,
  //         pokemonTypes: item.pokemonTypes,
  //         abilityName: item.abilityName || '',
  //         abilityDescription: item.abilityDescription || '',
  //         abilityID: item.id,
  //         moves:
  //       }
  //     });
  //   }
  // }

  useEffect(() => {
    if (!isUserSignedIn) {
      setRedirect('/sign-in');
    }
    if (!checkAllPokemonToEdit()) {
      setRedirect('/start-sequence/edit-your-pokemon');
    }
    getPresets();
    getFinalTeamData();
  }, []);

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="final-team-container text-subheader">
      {/* {
        exportItems && (
          <ExportModal 
            PokemonData={chosenPokemon} 
            onCloseModal={(() => {
              setExportItems(false);
            })} />
        )
      } */}
      <StartSequenceBanner
        header="Your Pokemon"
        subheader="A preview of your drafted pokemon - Proceed when ready."
        presets={presets}
      />
      <div className="final-team-items">
        {
          getFinalTeamMarkup()
        }
      </div>
      <div className="final-team-button-container">
        <Button 
          text="Export" 
          onClick={(() => {
            setExportItems(true);
          })} />
      </div>
    </div>
  );
}

export default FinalTeam;