import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/firestore';
import PokemonSprite from './PokemonSprite';
import PokemonType from './PokemonType';
import Button from './Button';
import { 
  PokemonDraftCardData, 
  PokemonTypes, 
  PokemonMovesType, 
  PokemonAbilityType,
  SelectedPokemonData, 
} from '../../utils/dataTypes';
import { capitalizeFirstLetter } from '../../utils/componentUtils';
import '../../styles/pokemon-draft-card.css';
import '../../styles/text.css';

function PokemonDraftCard(
  { 
    pokemonID,
    moveIDs,
    abilityID,
    color,
    onClick,
  }: PokemonDraftCardData,
) {
  const [pokemon, setPokemon] = useState<string>('');
  const [types, setTypes] = useState<PokemonTypes[]>([]);
  const [moveOne, setMoveOne] = useState<PokemonMovesType>();
  const [moveTwo, setMoveTwo] = useState<PokemonMovesType>();
  const [moveThree, setMoveThree] = useState<PokemonMovesType>();
  const [moveFour, setMoveFour] = useState<PokemonMovesType>();
  const [ability, setAbility] = useState<string>('');
  const [abilityDescription, setAbilityDescription] = useState<string>('');

  function getPokemon() {
    async function getPokemonFromFirestore() {
      const pokemonRef = db.collection('pokemon-gen-3');
      const maybePokemon = await pokemonRef.where('id', '==', pokemonID).get();
      if (!maybePokemon.empty) {
        maybePokemon.forEach((pokemonDoc) => {
          const data = pokemonDoc.data();
          setPokemon(data.name);
          setTypes(data.types);
        });
      }
    }
    getPokemonFromFirestore();
  }

  function getMove(moveID: number, moveSlot: number) {
    async function getMovesFromFirestore() {
      const movesRef = db.collection('pokemon-gen-3-moves');
      const maybeMove = await movesRef.where('id', '==', moveID).get();
      if (!maybeMove.empty) {
        maybeMove.forEach((moveDoc) => {
          const data = moveDoc.data();
          const moveInfo = {
            name: data.name,
            type: data.type,
          };
          switch (moveSlot) {
            case 1:
              setMoveOne(moveInfo);
              break;
            case 2:
              setMoveTwo(moveInfo);
              break;
            case 3:
              setMoveThree(moveInfo);
              break;
            case 4:
              setMoveFour(moveInfo);
              break;
            default:
              break;
          }
        });
      }
    }
    getMovesFromFirestore();
  }

  function getAbility() {
    async function getAbilityFromFirestore() {
      const abilityRef = db.collection('pokemon-gen-3-abilities');
      const maybeAbility = await abilityRef.where('id', '==', abilityID).get();
      if (!maybeAbility.empty) {
        maybeAbility.forEach((abilityDoc) => {
          const data = abilityDoc.data();
          setAbility(data.name);
          setAbilityDescription(data.description);
        });
      }
    }
    getAbilityFromFirestore();
  }

  function createSelectedPokemon() {
    if (moveOne && moveTwo && moveThree && moveFour && ability && pokemon) {
      return {
        pokemonID,
        pokemonName: pokemon,
        abilityID,
        abilityName: ability,
        moveIDs,
        moves: [
          moveOne?.name,
          moveTwo?.name,
          moveThree?.name,
          moveFour?.name,
        ],
      };
    }
    return null;
  }

  function getTypeContainerMarkup() {
    return (
      <div className="pokemon-type-container">
        {
          types.length !== 0 && types.map((type, index) => {
            return <PokemonType type={type} key={index} />;
          })
        }
      </div>
    );
  }

  function getMoveContainerMarkup() {
    return (
      <div className="pokemon-draft-card-moves-container">
        <p className="moves-title">Moves</p>
        {
          moveOne 
            && (
            <div className="pokemon-draft-card-move">
              <p className="move-name">{moveOne.name}</p>
              <PokemonType type={moveOne.type} />
            </div>
            )
        }
        {
          moveTwo 
            && (
            <div className="pokemon-draft-card-move">
              <p className="move-name">{moveTwo.name}</p>
              <PokemonType type={moveTwo.type} />
            </div>
            )
        }
        {
          moveThree 
            && (
            <div className="pokemon-draft-card-move">
              <p className="move-name">{moveThree.name}</p>
              <PokemonType type={moveThree.type} />
            </div>
            )
        }
        {
          moveFour 
            && (
            <div className="pokemon-draft-card-move">
              <p className="move-name">{moveFour.name}</p>
              <PokemonType type={moveFour.type} />
            </div>
            )
        }
      </div>
    );
  }

  function getAbilityContainerMarkup() {
    return (
      <div className="pokemon-draft-card-ability-container">
        <p className="ability-title">Ability</p>
        <p className="ability-name">{capitalizeFirstLetter(ability)}</p>
        <p className="ability-description">{abilityDescription}</p>
      </div>
    );
  }

  useEffect(() => {
    getPokemon();
    getAbility();
    if (moveIDs.length === 4) {
      getMove(moveIDs[0], 1);
      getMove(moveIDs[1], 2);
      getMove(moveIDs[2], 3);
      getMove(moveIDs[3], 4);
    }
  }, []);

  return (
    <div>
      <div className={`pokemon-draft-card-container pokemon-draft-card-${color}`}>
        <div className="pokemon-draft-card-banner">
          <p className="pokemon-name">{capitalizeFirstLetter(pokemon)}</p>
          {getTypeContainerMarkup()}
          <div className="pokemon-draft-card-image">
            {pokemon && <PokemonSprite pokemonName={pokemon} />}
          </div>
        </div>
        {getMoveContainerMarkup()}
        {getAbilityContainerMarkup()}
      </div>
      <div className="pokemon-draft-button-container">
        <Button 
          text="Select" 
          onClick={() => {
            const selectedPokemon = createSelectedPokemon();
            if (selectedPokemon) {
              onClick(selectedPokemon);
            }
          }} />
      </div>
    </div>
  );
}

export default PokemonDraftCard;