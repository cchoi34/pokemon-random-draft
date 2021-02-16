import React from 'react';
import { YourPokemonDraftProgressBarData } from '../../utils/dataTypes';
import '../../styles/your-pokemon-draft-progress-bar.css';
import '../../styles/text.css';

function YourPokemonDraftProgressBar({ pokemonDraftedImages }: YourPokemonDraftProgressBarData) {
  return (
    <div className="progress-bar-container">
      <p>Your Pokemon</p>
      <div className="progress-bar">
        <p>show pokemon images here</p>
      </div>
    </div>
  );
}

export default YourPokemonDraftProgressBar;