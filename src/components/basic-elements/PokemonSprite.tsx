import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/firestore';

type PokemonSpriteProps = {
  pokemonName: string,
}

function PokemonSprite({ pokemonName }: PokemonSpriteProps) {
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  function getImage(path: string) {
    async function getImageFromStorage() {
      try {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(path);
        const url = await imageRef.getDownloadURL();
        setImageSrc(url);
        setImageAlt(pokemonName);
      } catch (e) {
        console.log(e);
      }
    }
    getImageFromStorage();
  }

  function getPath() {
    const lowerCasePokemon = pokemonName.toLowerCase();
    return `pokemon-gen-3/${lowerCasePokemon}.png`;
  }

  useEffect(() => {
    getImage(getPath());
  }, []);

  return (
    <img
      src={imageSrc}
      alt={imageAlt}
    />
  );
}

export default PokemonSprite;