import React from 'react';
import { db, storage } from '../../firebase/firestore';
import PokemonSprite from './PokemonSprite';
import PokemonType from './PokemonType';
import { PokemonDraftCardData, PokemonTypes } from '../../utils/dataTypes';
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
      <div className="pokemon-draft-card-banner">
        <p>Blastoise</p>
        <p>Water</p>
        <div className="pokemon-draft-card-image">
          <PokemonSprite pokemonName="blastoise" />
        </div>
      </div>
      <div className="pokemon-draft-card-moves-container">
        <p className="moves-title">Moves</p>
        {moveIDs.map((moveID) => {
          return (
            <div className="pokemon-draft-card-move">
              <p className="move-name">Bulk up</p>
              <PokemonType type={PokemonTypes.DRAGON} />
            </div>
          );
        })}
      </div>
      <div className="pokemon-draft-card-ability-container">
        <p className="ability-title">Ability</p>
        <p className="ability-name">Drizzle</p>
        <p className="ability-description">The Pokemon makes it rain when it enters a battle.</p>
      </div>
    </div>
  );
}

export default PokemonDraftCard;