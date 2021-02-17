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
  pokemonDraftedImages: string[],
}

export type PokemonDraftCardData = {
  pokemonID: number,
  moveIDs: number[],
  abilityID: number,
  color: string,
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