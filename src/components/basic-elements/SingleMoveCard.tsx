import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firestore';
import PokemonType from './PokemonType';
import { SingleMoveCardProps, SingleMoveData } from '../../utils/dataTypes';
import { capitalizeFirstLetter } from '../../utils/componentUtils';
import '../../styles/single-move-card.css';
import { POKEMON_MOVES_COLLECTION } from '../../utils/firestoreUtils';

function SingleMoveCard(
  { moveID }: SingleMoveCardProps,
) {
  const [moveData, setMoveData] = useState<SingleMoveData | null>(null);

  function getMoveDataFromID() {
    async function getMoveDataFromFirebase() {
      const pokemonMovesRef = db.collection(POKEMON_MOVES_COLLECTION);
      const maybeMove = await pokemonMovesRef.where('id', '==', moveID).get();
      if (!maybeMove.empty) {
        maybeMove.forEach((moveDoc) => {
          const data = moveDoc.data();
          const moveInfo = {
            name: data.name,
            type: data.type,
            category: data.category,
            accuracy: data.accuracy,
            power: data.power,
          };
          setMoveData(moveInfo);
        });
      }
    }
    getMoveDataFromFirebase();
  }

  function getMoveContainerMarkup() {
    if (moveData) {
      return (
        <div className="single-move-card-data">
          <p>{capitalizeFirstLetter(moveData.name)}</p>
          <div className="single-move-card-type">
            <PokemonType type={moveData.type} />
          </div>
        </div>
      );
    }
    return <div />;
  }

  useEffect(() => {
    getMoveDataFromID();
  }, []);

  return (
    <div>
      <div className="single-move-card-container">
        {getMoveContainerMarkup()}
      </div>
    </div>
  );
}

export default SingleMoveCard;