import React from 'react';
import PokemonSprite from './PokemonSprite';
import { YourPokemonDraftProgressBarData } from '../../utils/dataTypes';
import '../../styles/your-pokemon-draft-progress-bar.css';
import '../../styles/text.css';

function YourPokemonDraftProgressBar({ allSelectedPokemon }: YourPokemonDraftProgressBarData) {
  return (
    <div className="progress-bar-container">
      <p>Your Pokemon</p>
      <ul className="progress-bar">
        {allSelectedPokemon.map((selectedPokemon, index) => {
          return (
            <li key={index}>
              <PokemonSprite pokemonName={selectedPokemon.pokemonName} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default YourPokemonDraftProgressBar;