import React from 'react';
import PokemonSprite from './PokemonSprite';
import { PokemonDraftCardData } from '../../utils/dataTypes';
import '../../styles/pokemon-draft-card.css';
import '../../styles/text.css';

function PokemonDraftCard(
  { 
    pokemonID,
    moveIDs,
    abilityID,
    color,
  }: PokemonDraftCardData,
) {
  return (
    <div className={`pokemon-draft-card-container pokemon-draft-card-${color}`}>
      <p>{pokemonID}</p>
      <PokemonSprite pokemonName="squirtle" />
      <p>{abilityID}</p>
      {moveIDs.map((moveID) => {
        return <p>{moveID}</p>;
      })}
    </div>
  );
}

export default PokemonDraftCard;