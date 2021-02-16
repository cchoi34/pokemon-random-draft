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