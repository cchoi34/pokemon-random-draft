import { PokemonGenerations } from './draftUtils';

export type RuleCardData = {
  title: string,
  description: string,
  color: string,
}

export type AllRuleCardData = {
  ruleCardOne: RuleCardData,
  ruleCardTwo: RuleCardData,
  ruleCardThree: RuleCardData,
}

export type PresetBannerData = {
  generation: string,
  legendaries: boolean,
  hinderingAbilities: boolean,
  wonderGuard: boolean,
}

export type DraftPresetsData = {
  generation: PokemonGenerations,
  legendaries: boolean,
  hinderingAbilities: boolean,
  wonderGuard: boolean,
}

export type YourPokemonDraftProgressBarData = {
  allSelectedPokemon: SelectedPokemonData[],
}

export type SelectedPokemonData = {
  pokemonID: number,
  pokemonName: string,
  pokemonTypes: PokemonTypes[],
  abilityName: string,
  abilityDescription: string,
  abilityID: number,
  moves: SingleMoveData[],
}

export type YourPokemonDraftItemData = {
  id: number,
  pokemonID: number,
  pokemonName: string,
  pokemonTypes: PokemonTypes[],
  abilityName: string,
  abilityDescription: string,
  abilityID: number,
  moves: SingleMoveData[],
}

export type PokemonDraftCardData = {
  pokemonID: number,
  moveIDs: number[],
  abilityID: number,
  color: string,
  onClick: (pokemon: SelectedPokemonData) => void,
}

export type PokemonPreviewCardData = {
  pokemonName: string,
  pokemonTypes: PokemonTypes[],
  moves: SingleMoveData[],
  abilityName: string,
  abilityDescription: string,
  color: string,
}

export type SinglePokemonCardData = {
  pokemonName: string,
  pokemonTypes: PokemonTypes[],
  moves?: SingleMoveWithIDData[],
  abilityName?: string,
  abilityDescription?: string,
  id: number,
}

export type SingleAbilityData = {
  name: string,
  description: string,
  used: boolean,
}

export type SingleAbilityWithIDData = {
  name: string,
  description: string,
  id: number,
  used: boolean,
}

export type SingleMoveWithIDData = {
  move: SingleMoveData,
  id: number,
  used: boolean,
}

export type SingleMoveData = {
  id: number,
  name: string,
  type: PokemonTypes,
  power?: string,
  category?: MovesStatusTypes,
  accuracy?: string,
}

export type PokemonMovesAndAbilitiesDraftCardData = {
  pokemonID: number,
  moveIDs: number[],
  abilityID: number,
}

export type DraftIDsByRound = {
  roundOne: PokemonMovesAndAbilitiesDraftCardData[],
  roundTwo: PokemonMovesAndAbilitiesDraftCardData[],
  roundThree: PokemonMovesAndAbilitiesDraftCardData[],
  roundFour: PokemonMovesAndAbilitiesDraftCardData[],
  roundFive: PokemonMovesAndAbilitiesDraftCardData[],
  roundSix: PokemonMovesAndAbilitiesDraftCardData[],
  roundSeven: PokemonMovesAndAbilitiesDraftCardData[],
  roundEight: PokemonMovesAndAbilitiesDraftCardData[],
  roundNine: PokemonMovesAndAbilitiesDraftCardData[],
  roundTen: PokemonMovesAndAbilitiesDraftCardData[],
}

export type PokemonAbilityType = {
  name: string,
  description: string,
}

export enum PokemonTypes {
  NORMAL = 'normal',
  FIGHTING = 'fighting',
  GRASS = 'grass',
  FIRE = 'fire',
  WATER = 'water',
  ROCK = 'rock',
  GROUND = 'ground',
  POISON = 'poison',
  STEEL = 'steel',
  DARK = 'dark',
  GHOST = 'ghost',
  PSYCHIC = 'psychic',
  DRAGON = 'dragon',
  ICE = 'ice',
  FAIRY = 'fairy',
  FLYING = 'flying',
  ELECTRIC = 'electric',
  BUG = 'bug',
}

export enum MovesStatusTypes {
  PHYSICAL = 'physical',
  SPECIAL = 'special',
  STATUS = 'status',
}