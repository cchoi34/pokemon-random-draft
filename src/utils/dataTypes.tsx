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

export type YourPokemonDraftProgressBarData = {
  allSelectedPokemon: SelectedPokemonData[],
}

export type SelectedPokemonData = {
  pokemonID: number,
  pokemonName: string,
  abilityName: string,
  abilityID: number,
  moves: string[],
  moveIDs: number[],
}

export type PokemonDraftCardData = {
  pokemonID: number,
  moveIDs: number[],
  abilityID: number,
  color: string,
  onClick: (pokemon: SelectedPokemonData) => void,
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

export type PokemonMovesType = {
  name: string,
  type: PokemonTypes,
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