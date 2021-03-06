import React from 'react';
import { db } from '../firebase/firestore';
import * as componentUtils from './componentUtils';
import { RuleCardData, AllRuleCardData } from './dataTypes';

export const POKEMON_COLLECTION = 'pokemon';
export const POKEMON_ABILITIES_COLLECTION = 'pokemon-abilities';
export const POKEMON_MOVES_COLLECTION = 'pokemon-moves';
export const RULES_COLLECTION = 'rules';
export const USERS_COLLECTION = 'users';

export const POKEBALLS_STORAGE_PATH = 'pokeballs';
export const POKEMON_STORAGE_PATH = 'pokemon';
export const POKEBALL_CLOSED_PNG = 'Pokeball Closed.png';
export const POKEBALL_OPEN_PNG = 'Pokeball Open.png';