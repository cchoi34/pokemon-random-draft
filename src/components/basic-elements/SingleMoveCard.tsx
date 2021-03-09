import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firestore';
import PokemonType from './PokemonType';
import { SingleMoveData, SingleMoveWithIDData } from '../../utils/dataTypes';
import { capitalizeFirstLetter } from '../../utils/componentUtils';
import '../../styles/single-move-card.css';

function SingleMoveCard(
  { move, used, id }: SingleMoveWithIDData,
) {
  function getMoveContainerMarkup() {
    if (move) {
      return (
        <div className="single-move-card-data">
          <p>{capitalizeFirstLetter(move.name)}</p>
          <div className="single-move-card-type">
            <PokemonType type={move.type} />
          </div>
        </div>
      );
    }
    return <div />;
  }

  return (
    <div>
      <div className="single-move-card-container">
        {getMoveContainerMarkup()}
      </div>
    </div>
  );
}

export default SingleMoveCard;