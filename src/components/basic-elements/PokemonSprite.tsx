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
      const storageRef = storage.ref();
      const imageRef = storageRef.child(path);
      const url = await imageRef.getDownloadURL();
      setImageSrc(url);
      setImageAlt(pokemonName);
    }
    getImageFromStorage();
  }

  function getPath() {
    return `pokemon-gen-3/${pokemonName}.png`;
  }

  useEffect(() => {
    getImage(getPath());
  });

  return (
    <img
      src={imageSrc}
      alt={imageAlt}
    />
  );
}

export default PokemonSprite;