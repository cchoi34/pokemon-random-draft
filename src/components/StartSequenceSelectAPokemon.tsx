import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { db, storage } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
import { SelectedPokemonData, PresetBannerData } from '../utils/dataTypes';
import StartSequenceBanner from './basic-elements/StartSequenceBanner';
import PokemonDraftCard from './basic-elements/PokemonDraftCard';
import Button from './basic-elements/Button';
import '../styles/select-a-pokemon.css';
import '../styles/text.css';

enum SelectionItem {
  POKEBALL = 'pokeball',
  POKEMON = 'pokemon',
}

function StartSequenceSelectAPokemon() {
  const [isUserSignedIn] = useState(userAuthUtils.isUserSignedIn());
  const [redirect, setRedirect] = useState<string | null>(null);
  const [allSelectedPokemon, setAllSelectedPokemon] = useState<SelectedPokemonData[]>([]);
  const [slotOneID] = useState('slot-1');
  const [imageOneClosed, setImageOneClosed] = useState(true);
  const [pokemonCardOneVisible, setPokemonCardOneVisible] = useState(false);
  const [slotTwoID] = useState('slot-2');
  const [imageTwoClosed, setImageTwoClosed] = useState(true);
  const [pokemonCardTwoVisible, setPokemonCardTwoVisible] = useState(false);
  const [slotThreeID] = useState('slot-3');
  const [imageThreeClosed, setImageThreeClosed] = useState(true);
  const [pokemonCardThreeVisible, setPokemonCardThreeVisible] = useState(false);
  const [presets, setPresets] = useState<PresetBannerData>({
    generation: '',
    legendaries: true,
    hinderingAbilities: false,
    wonderGuard: false,
  });

  function getPokeballIcon(imageId: string, closed: boolean) {
    async function getPokeballPNG() {
      const storageRef = storage.ref();
      let url = '';
      if (closed) {
        const pokeballRef = storageRef.child('pokeballs/Pokeball Closed.png');
        url = await pokeballRef.getDownloadURL();
      } else {
        const pokeballRef = storageRef.child('pokeballs/Pokeball Open.png');
        url = await pokeballRef.getDownloadURL();
      }
      const image = document.getElementById(imageId);
      image?.setAttribute('src', url);
    }
    getPokeballPNG();
  }

  function getCardColor(slotID: string) {
    let color = '';
    switch (slotID) {
      case slotOneID:
        color = 'green';
        break;
      case slotTwoID:
        color = 'orange';
        break;
      case slotThreeID:
        color = 'blue';
        break;
      default:
        color = 'green';
    }
    return color;
  }
  
  function getPresets() {
    async function getPresetsFromFirebase() {
      const usersRef = db.collection('users');
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

  function validateAllSelectedPokemon(allSelectedPokemon: SelectedPokemonData[]): boolean {
    return allSelectedPokemon.length <= componentUtils.MAX_SELECTED_DRAFT_POKEMON;
  }

  function getSelectedPokemonFromFirebase() {
    async function getSelectedPokemonForUser() {
      const userID = userAuthUtils.getUserAuthToken();
      const usersRef = db.collection('users');
      if (userID !== null) {
        const doc = await usersRef.doc(userID).get();
        const currentDraftItems = doc.data()?.currentDraftItems;
        if (validateAllSelectedPokemon(currentDraftItems)) {
          setAllSelectedPokemon(currentDraftItems);
        } else {
          setAllSelectedPokemon([]);
        }
      }
    }
    getSelectedPokemonForUser();
  }

  function setSelectedPokemonToFirebase(allSelectedPokemon: SelectedPokemonData[]) {
    async function setSelectedPokemonForUser() {
      const userID = userAuthUtils.getUserAuthToken();
      const usersRef = db.collection('users');
      if (userID !== null) {
        await usersRef.doc(userID).set({
          currentDraftItems: allSelectedPokemon,
        }, { merge: true });
      }
    }
    if (validateAllSelectedPokemon(allSelectedPokemon)) {
      setSelectedPokemonForUser();
    }
  }

  function onSelectPokemonClick(selectedPokemon: SelectedPokemonData) {
    const newSelectedPokemon = [...allSelectedPokemon, selectedPokemon];
    if (validateAllSelectedPokemon(newSelectedPokemon)) {
      setAllSelectedPokemon(newSelectedPokemon);
      setSelectedPokemonToFirebase(newSelectedPokemon);   
    }
  }

  function getPokemonCardItem(slotID: string) {
    const moveIDs = [1, 2, 3, 4];
    return (
      <PokemonDraftCard 
        pokemonID={1} 
        moveIDs={moveIDs}
        abilityID={1}
        color={getCardColor(slotID)}
        onClick={onSelectPokemonClick}
      />
    );
  }

  function getPokemonCardAfterDelay(slotID: string) {
    setTimeout(() => {
      switch (slotID) {
        case slotOneID:
          setPokemonCardOneVisible(true);
          break;
        case slotTwoID:
          setPokemonCardTwoVisible(true);
          break;
        case slotThreeID:
          setPokemonCardThreeVisible(true);
          break;
        default:
          break;
      }
    }, componentUtils.POKEBALL_ANIMATION_DELAY);
  }

  function onPokeballClick(imageID: string): void {
    switch (imageID) {
      case slotOneID:
        setImageOneClosed(false);
        getPokemonCardAfterDelay(slotOneID);
        break;
      case slotTwoID:
        setImageTwoClosed(false);
        getPokemonCardAfterDelay(slotTwoID);
        break;
      case slotThreeID:
        setImageThreeClosed(false);
        getPokemonCardAfterDelay(slotThreeID);
        break;
      default:
        break;
    }
  }

  function getPokeballItem(slotID: string) {
    let imageClosed: boolean = true;
    switch (slotID) {
      case slotOneID:
        imageClosed = imageOneClosed;
        break;
      case slotTwoID:
        imageClosed = imageTwoClosed;
        break;
      case slotThreeID:
        imageClosed = imageThreeClosed;
        break;
      default:
        break;
    }
    return (
      <input
        type="image"
        id={slotID}
        alt={`pokeball ${slotID}`}
        className={imageClosed
          ? 'select-a-pokemon-interactable-element'
          : 'select-a-pokemon-non-interactable-element'}
        onClick={() => {
          onPokeballClick(slotID);
        }}
      />
    );
  }

  function getSelectionItem(slotID: string) {
    switch (slotID) {
      case slotOneID:
        if (pokemonCardOneVisible) {
          return getPokemonCardItem(slotID);
        } 
        return getPokeballItem(slotID);
      case slotTwoID:
        if (pokemonCardTwoVisible) {
          return getPokemonCardItem(slotID);
        } 
        return getPokeballItem(slotID);
      case slotThreeID:
        if (pokemonCardThreeVisible) {
          return getPokemonCardItem(slotID);
        } 
        return getPokeballItem(slotID);
      default:
        return getPokeballItem(slotID);
    }
  }

  useEffect(() => {
    if (!isUserSignedIn) {
      setRedirect('/sign-in');
    }
    getPokeballIcon(slotOneID, imageOneClosed);
    getPokeballIcon(slotTwoID, imageTwoClosed);
    getPokeballIcon(slotThreeID, imageThreeClosed);
    getPresets();
    getSelectedPokemonFromFirebase();
  }, [imageOneClosed, imageTwoClosed, imageThreeClosed]);

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="select-a-pokemon-container text-subheader">
      <div className="select-a-pokemon-banner-container">
        <StartSequenceBanner 
          header="Select a Pokemon"
          subheader={'Click a ball to find out what\'s inside'}
          presets={presets}
          progressBar={{ allSelectedPokemon }}
        />
      </div>
      <div className="select-a-pokemon-selection-container">
        <div className="select-a-pokemon-selection-item-1">
          {getSelectionItem(slotOneID)}
        </div>
        <div className="select-a-pokemon-selection-item-2">
          {getSelectionItem(slotTwoID)}
        </div>
        <div className="select-a-pokemon-selection-item-3">
          {getSelectionItem(slotThreeID)}
        </div>
      </div>
    </div>
  );
}

export default StartSequenceSelectAPokemon;