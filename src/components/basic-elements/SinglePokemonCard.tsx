import React, { useState, useEffect } from 'react';
import PokemonSprite from './PokemonSprite';
import PokemonType from './PokemonType';
import SingleMoveCard from './SingleMoveCard';
import { SinglePokemonCardData } from '../../utils/dataTypes';
import { capitalizeFirstLetter } from '../../utils/componentUtils';
import '../../styles/single-pokemon-card.css';
import '../../styles/text.css';

function SinglePokemonCard(
  { 
    pokemonName,
    pokemonTypes,
    moves,
    abilityName,
    abilityDescription,
    id,
  }: SinglePokemonCardData,
) {
  function getTypeContainerMarkup() {
    return (
      <div className="single-pokemon-card-type-container">
        {
          pokemonTypes.length !== 0 && pokemonTypes.map((type, index) => {
            return (
              <div className="single-pokemon-card-move-type" key={index}>
                <PokemonType type={type} />
              </div>
            );
          })
        }
      </div>
    );
  }

  function getMoveContainerMarkup() {
    if (moves && moves.length > 0) {
      return (
        <div className="single-pokemon-card-moves-container">
          <p className="single-pokemon-card-moves-title">Moves</p>
          <div className="single-pokemon-card-move-box">
            {
              moves.map((move) => {
                return (
                  <div className="single-pokemon-card-move" key={move.id}>
                    <SingleMoveCard 
                      moveID={move.moveID}
                      used={false}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
      );
    }
    return <div />;
  }

  function getAbilityContainerMarkup() {
    if (abilityName && abilityDescription) {
      return (
        <div className="single-pokemon-card-ability-container">
          <p className="single-pokemon-card-ability-title">Ability</p>
          <p className="single-pokemon-card-ability-name">{capitalizeFirstLetter(abilityName)}</p>
          <p className="single-pokemon-card-ability-decsription">{abilityDescription}</p>
        </div>
      );
    }
    return <div />;
  }

  return (
    <div>
      <div className="single-pokemon-card-container">
        <div className="single-pokemon-card-banner">
          <p className="single-pokemon-card-pokemon-name">{capitalizeFirstLetter(pokemonName)}</p>
          <div className="single-pokemon-card-image">
            <PokemonSprite pokemonName={pokemonName} />
          </div>
          {getTypeContainerMarkup()}
        </div>
        {getMoveContainerMarkup()}
        {getAbilityContainerMarkup()}
      </div>
    </div>
  );
}

export default SinglePokemonCard;