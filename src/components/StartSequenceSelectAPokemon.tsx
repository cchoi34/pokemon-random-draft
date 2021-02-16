import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { db, storage } from '../firebase/firestore';
import * as userAuthUtils from '../utils/userAuthUtils';
import * as componentUtils from '../utils/componentUtils';
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
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);
  const [slotOneID, setImageOneID] = useState('slot-1');
  const [imageOneClosed, setImageOneClosed] = useState(true);
  const [slotTwoID, setSlotTwoID] = useState('slot-2');
  const [imageTwoClosed, setImageTwoClosed] = useState(true);
  const [slotThreeID, setSlotThreeID] = useState('slot-3');
  const [imageThreeClosed, setImageThreeClosed] = useState(true);

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

  function onPokeballClick(imageID: string): void {
    switch (imageID) {
      case slotOneID:
        setImageOneClosed(false);
        break;
      case slotTwoID:
        setImageTwoClosed(false);
        break;
      case slotThreeID:
        setImageThreeClosed(false);
        break;
      default:
        break;
    }
  }

  // function getPokemonDraftCard()
  function getSelectionItem(item: SelectionItem, slotID: string) {
    if (item === SelectionItem.POKEBALL) {
      return (
        <input
          type="image"
          id={slotID}
          alt={`pokeball ${slotID}`}
          className={imageOneClosed 
            ? 'select-a-pokemon-interactable-element' 
            : 'select-a-pokemon-non-interactable-element'}
          onClick={() => {
            onPokeballClick(slotID);
          }}
        />
      );
    }
    if (item === SelectionItem.POKEMON) {
      const moveIDs = [1, 2, 1, 2];
      return (
        <PokemonDraftCard 
          pokemonID={1} 
          moveIDs={moveIDs}
          abilityID={1}
          color="green"
        />
      );
    }
    return <div />;
  }

  useEffect(() => {
    getPokeballIcon(slotOneID, imageOneClosed);
    getPokeballIcon(slotTwoID, imageTwoClosed);
    getPokeballIcon(slotThreeID, imageThreeClosed);
  });

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  }
  const presets = {
    generation: 'Gen-3',
    legendaries: true,
    hinderingAbilities: false,
    wonderGuard: false,
  };

  const draftProgressBar = {
    pokemonDraftedImages: [
      'gs://pokemon-random-draft.appspot.com/pokemon-gen-3/Bulbasaur.png',
    ],
  };

  return (
    <div className="select-a-pokemon-container text-subheader">
      <div className="select-a-pokemon-banner-container">
        <StartSequenceBanner 
          header="Select a Pokemon"
          subheader={'Click a ball to find out what\'s inside'}
          presets={presets}
          draftProgressBar={draftProgressBar}
        />
      </div>
      <div className="select-a-pokemon-selection-container">
        {getSelectionItem(SelectionItem.POKEMON, slotOneID)}
        {getSelectionItem(SelectionItem.POKEBALL, slotTwoID)}
        {getSelectionItem(SelectionItem.POKEBALL, slotThreeID)}
      </div>
    </div>
  );
}

export default StartSequenceSelectAPokemon;