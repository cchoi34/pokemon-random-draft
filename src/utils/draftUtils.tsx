import { MAX_SELECTED_DRAFT_POKEMON } from './componentUtils';
import { PokemonMovesAndAbilitiesDraftCardData, DraftIDsByRound, DraftPresetsData } from './dataTypes';

/* DO NOT CHANGE THESE VALUES! */
export enum PokemonGenerations {
  GEN_1 = 'generation-1',
  GEN_2 = 'generation-2',
  GEN_3 = 'generation-3',
  GEN_4 = 'generation-4',
  GEN_5 = 'generation-5',
  GEN_6 = 'generation-6',
  GEN_7 = 'generation-7',
  GEN_8 = 'generation-8',
  GEN_TESTING = 'generation-testing',
}

export const GEN_1_POKEMON_LIMIT = 151;
export const GEN_2_POKEMON_LIMIT = 251;
export const GEN_3_POKEMON_LIMIT = 386;
export const GEN_4_POKEMON_LIMIT = 493;
export const GEN_5_POKEMON_LIMIT = 649;
export const GEN_6_POKEMON_LIMIT = 721;
export const GEN_7_POKEMON_LIMIT = 809;
export const GEN_8_POKEMON_LIMIT = 898;

export const GEN_1_MOVES_LIMIT = 165;
export const GEN_2_MOVES_LIMIT = 251;
export const GEN_3_MOVES_LIMIT = 354;
export const GEN_4_MOVES_LIMIT = 467;
export const GEN_5_MOVES_LIMIT = 559;
export const GEN_6_MOVES_LIMIT = 621;
export const GEN_7_MOVES_LIMIT = 742; // includes many duplicates
export const GEN_8_MOVES_LIMIT = 826;

export const GEN_3_ABILITY_LIMIT = 76; // excludes ability cacophony
export const GEN_4_ABILITY_LIMIT = 123;
export const GEN_5_ABILITY_LIMIT = 164;
export const GEN_6_ABILITY_LIMIT = 191;
export const GEN_7_ABILITY_LIMIT = 233;
export const GEN_8_ABILITY_LIMIT = 266;

/* Testing Values */
export const TESTING_POKEMON_LIMIT = 9;
export const TESTING_MOVES_LIMIT = 14;
export const TESTING_ABILITY_LIMIT = 6;

/* additional consts */
export const POKEMON_PER_ROUND = 3;
export const ABILITIES_PER_POKEMON = 1;
export const MOVES_PER_POKEMON = 4;

/* Special abilities */
export const WONDER_GUARD_ID = 25;

function getGenerationLimits(generation: string) {
  switch (generation) {
    case PokemonGenerations.GEN_1:
      return {
        pokemonLimit: GEN_1_POKEMON_LIMIT,
        abilityLimit: GEN_3_ABILITY_LIMIT,
        moveLimit: GEN_1_MOVES_LIMIT,
      };
    case PokemonGenerations.GEN_2:
      return {
        pokemonLimit: GEN_2_POKEMON_LIMIT,
        abilityLimit: GEN_3_ABILITY_LIMIT,
        moveLimit: GEN_2_MOVES_LIMIT,
      };
    case PokemonGenerations.GEN_3:
      return {
        pokemonLimit: GEN_3_POKEMON_LIMIT,
        abilityLimit: GEN_3_ABILITY_LIMIT,
        moveLimit: GEN_3_MOVES_LIMIT,
      };
    case PokemonGenerations.GEN_4:
      return {
        pokemonLimit: GEN_4_POKEMON_LIMIT,
        abilityLimit: GEN_4_ABILITY_LIMIT,
        moveLimit: GEN_4_MOVES_LIMIT,
      };
    case PokemonGenerations.GEN_5:
      return {
        pokemonLimit: GEN_5_POKEMON_LIMIT,
        abilityLimit: GEN_5_ABILITY_LIMIT,
        moveLimit: GEN_5_MOVES_LIMIT,
      };
    case PokemonGenerations.GEN_6:
      return {
        pokemonLimit: GEN_6_POKEMON_LIMIT,
        abilityLimit: GEN_6_ABILITY_LIMIT,
        moveLimit: GEN_6_MOVES_LIMIT,
      };
    case PokemonGenerations.GEN_7:
      return {
        pokemonLimit: GEN_7_POKEMON_LIMIT,
        abilityLimit: GEN_7_ABILITY_LIMIT,
        moveLimit: GEN_7_MOVES_LIMIT,
      };
    case PokemonGenerations.GEN_8:
      return {
        pokemonLimit: GEN_8_POKEMON_LIMIT,
        abilityLimit: GEN_8_ABILITY_LIMIT,
        moveLimit: GEN_8_MOVES_LIMIT,
      };
    case PokemonGenerations.GEN_TESTING:
      return {
        pokemonLimit: TESTING_POKEMON_LIMIT,
        abilityLimit: TESTING_ABILITY_LIMIT,
        moveLimit: TESTING_MOVES_LIMIT,
      };
    default:
      return {
        pokemonLimit: GEN_3_POKEMON_LIMIT,
        abilityLimit: GEN_3_ABILITY_LIMIT,
        moveLimit: GEN_3_MOVES_LIMIT,
      };
  }
}

function generateUniquePokemonIDs(
  quantity: number, 
  limit: number, 
): number[] {
  const uniqueNumbers: number[] = [];
  while (uniqueNumbers.length < quantity) {
    const randomNumber = Math.ceil(Math.random() * limit);
    if (!uniqueNumbers.includes(randomNumber)) {
      uniqueNumbers.push(randomNumber);
    }
  }
  return uniqueNumbers;
}

function generateUniqueAbilityIDs(
  quantity: number, 
  limit: number, 
  wonderGuard: boolean,
): number[] {
  const uniqueNumbers: number[] = [];
  while (uniqueNumbers.length < quantity) {
    const randomNumber = Math.ceil(Math.random() * limit);
    if (!uniqueNumbers.includes(randomNumber)) {
      if (wonderGuard) {
        uniqueNumbers.push(randomNumber);
      } else {
        if (randomNumber === WONDER_GUARD_ID) {
          break;
        }
        uniqueNumbers.push(randomNumber);
      }
    }
  }
  return uniqueNumbers;
}

function generateUniqueMoveIDs(limit: number): number[][] {
  const quantity = MOVES_PER_POKEMON * POKEMON_PER_ROUND;
  const uniqueNumbers: number[] = [];
  while (uniqueNumbers.length < quantity) {
    const randomNumber = Math.ceil(Math.random() * limit);
    if (!uniqueNumbers.includes(randomNumber)) {
      uniqueNumbers.push(randomNumber);
    }
  }
  const groupedMoveIDs: number[][] = [];
  for (let i = 0; i < uniqueNumbers.length; i += MOVES_PER_POKEMON) {
    const moveSet: number[] = [];
    for (let j = 0; j < MOVES_PER_POKEMON; j += 1) {
      moveSet.push(uniqueNumbers[i + j]);
    }
    groupedMoveIDs.push(moveSet);
  }
  return groupedMoveIDs;
}

export function getRoundDataFromRoundNumber(
  index: number, 
  data: DraftIDsByRound,
): PokemonMovesAndAbilitiesDraftCardData[] {
  switch (index) {
    case 0:
      return data.roundOne;
    case 1:
      return data.roundTwo;
    case 2:
      return data.roundThree;
    case 3:
      return data.roundFour;
    case 4:
      return data.roundFive;
    case 5:
      return data.roundSix;
    case 6:
      return data.roundSeven;
    case 7:
      return data.roundEight;
    case 8:
      return data.roundNine;
    case 9:
      return data.roundTen;
    default:
      return data.roundOne;
  }
}

function turnPokemonDataToMap(data: PokemonMovesAndAbilitiesDraftCardData[][]) {
  if (data.length === MAX_SELECTED_DRAFT_POKEMON && data[0].length === POKEMON_PER_ROUND) {
    const mappedData: DraftIDsByRound = {
      roundOne: data[0],
      roundTwo: data[1],
      roundThree: data[2],
      roundFour: data[3],
      roundFive: data[4],
      roundSix: data[5],
      roundSeven: data[6],
      roundEight: data[7],
      roundNine: data[8],
      roundTen: data[9],
    };
    return mappedData;
  }
  return {
    roundOne: [],
    roundTwo: [],
    roundThree: [],
    roundFour: [],
    roundFive: [],
    roundSix: [],
    roundSeven: [],
    roundEight: [],
    roundNine: [],
    roundTen: [],
  };
}

export function generateRandomDraftPokemonMoveAndAbilityData(draftPresets: DraftPresetsData) {
  const generation = draftPresets.generation;
  const limitData = getGenerationLimits(generation);
  const randomDraftIDsByRound: PokemonMovesAndAbilitiesDraftCardData[][] = [];
  for (let i = 0; i < MAX_SELECTED_DRAFT_POKEMON; i += 1) {
    const uniquePokemonIDs = generateUniquePokemonIDs(
      POKEMON_PER_ROUND, 
      limitData.pokemonLimit,
    );
    const uniqueAbilityIDs = generateUniqueAbilityIDs(
      POKEMON_PER_ROUND * ABILITIES_PER_POKEMON,
      limitData.abilityLimit,
      draftPresets.wonderGuard,
    );
    const uniqueMoveIDs = generateUniqueMoveIDs(limitData.moveLimit);
    const roundItems = uniquePokemonIDs.map((pokemonID, index) => {
      return {
        pokemonID,
        abilityID: uniqueAbilityIDs[index],
        moveIDs: uniqueMoveIDs[index],
      };
    });
    randomDraftIDsByRound.push(roundItems);
  }
  return turnPokemonDataToMap(randomDraftIDsByRound);
}
