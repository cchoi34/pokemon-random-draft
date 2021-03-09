import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { db } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
import { PresetBannerData, YourPokemonDraftItemData } from '../utils/dataTypes';
import StartSequenceBanner from './basic-elements/StartSequenceBanner';
import ExportModal from './basic-elements/ExportModal';
import Button from './basic-elements/Button';
import '../styles/final-team.css';
import '../styles/text.css';
import { USERS_COLLECTION } from '../utils/firestoreUtils';
import { MOVES_PER_POKEMON } from '../utils/draftUtils';
import PokemonPreviewCard from './basic-elements/PokemonPreviewCard';

function FinalTeam() {
  const [isUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  const [redirect, setRedirect] = useState<string | null>(null);
  const [finalTeam, setFinalTeam] = useState<YourPokemonDraftItemData[]>([]);
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
          const finalTeam = data?.finalTeam;
          if (finalTeam) {
            setFinalTeam(finalTeam);
          } else {
            setRedirect('/start-sequence/edit-your-pokemon');
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
                <PokemonPreviewCard
                  key={pokemon.id}
                  pokemonName={pokemon.pokemonName}
                  pokemonTypes={pokemon.pokemonTypes}
                  moves={pokemon.moves}
                  abilityName={pokemon.abilityName}
                  abilityDescription={pokemon.abilityDescription}
                  color="blue"
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
      {
        exportItems && (
          <ExportModal 
            PokemonData={finalTeam} 
            onCloseModal={(() => {
              setExportItems(false);
            })} />
        )
      }
      <StartSequenceBanner
        header="Final Team"
        subheader="Export the team, and import it to Pokemon Showdown to battle!"
        presets={presets}
      />
      <div className="final-team-items">
        {
          getFinalTeamMarkup()
        }
      </div>
      <div className="final-team-button-container">
        <div className="final-team-link-container">
          <Link to="/start-sequence/edit-your-pokemon">
            <Button text="Back" />
          </Link>
        </div>
        <div className="final-team-link-container">
          <Button 
            text="Export" 
            onClick={(() => {
              setExportItems(true);
            })} />
        </div>
      </div>
    </div>
  );
}

export default FinalTeam;