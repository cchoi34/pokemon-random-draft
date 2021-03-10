import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firestore';
import PokemonType from './PokemonType';
import Tooltip from './MoveTooltip';
import { SingleMoveData, SingleMoveWithIDData } from '../../utils/dataTypes';
import { capitalizeFirstLetter } from '../../utils/componentUtils';
import '../../styles/single-move-card.css';

function SingleMoveCard(
  { move, used, id }: SingleMoveWithIDData,
) {
  const [showMoveTooltip, setShowMoveTooltip] = useState<boolean>(false);

  function getPercentage(text: string) {
    const num = parseFloat(text);
    if (num) {
      const percent = num * 100;
      return `${percent.toString()}%`;
    }
    return text;
  }
  
  function getTooltip() {
    const power = move.power || '';
    let accuracy = move.accuracy || '';
    accuracy = getPercentage(accuracy);
    const category = move.category || '';
    
    return (
      <Tooltip 
        moveName={capitalizeFirstLetter(move.name)}
        category={category}
        power={power}
        accuracy={accuracy}
       />
    );
  }

  function getMoveContainerMarkup() {
    if (move) {
      return (
        <div className="single-move-card-data">
          {showMoveTooltip && getTooltip()}
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
      <div 
        className="single-move-card-container" 
        onMouseOver={(() => {
          setShowMoveTooltip(true);
        })}
        onFocus={(() => {
          setShowMoveTooltip(true);
        })}
        onMouseLeave={(() => {
          setShowMoveTooltip(false);
        })}
        onBlur={(() => {
          setShowMoveTooltip(false);
        })}
      >
        {getMoveContainerMarkup()}
      </div>
    </div>
  );
}

export default SingleMoveCard;