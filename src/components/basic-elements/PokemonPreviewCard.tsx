import React, { useState, useEffect } from 'react';
import PokemonSprite from './PokemonSprite';
import PokemonType from './PokemonType';
import Button from './Button';
import { PokemonPreviewCardData } from '../../utils/dataTypes';
import { capitalizeFirstLetter } from '../../utils/componentUtils';
import '../../styles/pokemon-preview-card.css';
import '../../styles/text.css';

function PokemonPreviewCard(
  { 
    pokemonName,
    pokemonTypes,
    moves,
    abilityName,
    abilityDescription,
    color,
  }: PokemonPreviewCardData,
) {
  function getTypeContainerMarkup() {
    return (
      <div className="pokemon-preview-card-type-container">
        {
          pokemonTypes.length !== 0 && pokemonTypes.map((type, index) => {
            return (
              <div className="pokemon-preview-card-move-type" key={index}>
                <PokemonType type={type} />
              </div>
            );
          })
        }
      </div>
    );
  }

  function getMoveContainerMarkup() {
    return (
      <div className="pokemon-preview-card-moves-container">
        <p className="pokemon-preview-card-moves-title">Moves</p>
        <div className="pokemon-preview-card-move-box">
          {
            moves.map((move) => {
              return (
                <div className="pokemon-preview-card-move" key={move.name}>
                  <p className="pokemon-preview-card-move-name">{capitalizeFirstLetter(move.name)}</p>
                  <div className="pokemon-preview-card-move-type">
                    <PokemonType type={move.type} />
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

  function getAbilityContainerMarkup() {
    return (
      <div className="pokemon-preview-card-ability-container">
        <p className="pokemon-preview-card-ability-title">Ability</p>
        <p className="pokemon-preview-card-ability-name">{capitalizeFirstLetter(abilityName)}</p>
      </div>
    );
  }

  return (
    <div>
      <div className={`pokemon-preview-card-container pokemon-preview-card-${color}`}>
        <div className="pokemon-preview-card-banner">
          <p className="pokemon-preview-card-pokemon-name">{capitalizeFirstLetter(pokemonName)}</p>
          <div className="pokemon-preview-card-image">
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

export default PokemonPreviewCard;