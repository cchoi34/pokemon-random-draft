import React from 'react';
import '../../styles/your-pokemon-draft-progress-bar.css';
import '../../styles/text.css';

type YourPokemonDraftProgressBarProps = {
  pokemonDraftedImages: string[],
}

function YourPokemonDraftProgressBar({ pokemonDraftedImages }: YourPokemonDraftProgressBarProps) {
  return (
    <div className="progress-bar-container">
      <p>Your Pokemon</p>
      <div className="progress-bar">
        <p>pokemon</p>
      </div>
    </div>
  );
}

export default YourPokemonDraftProgressBar;