import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firestore';
import PokemonType from './PokemonType';
import { SingleAbilityData } from '../../utils/dataTypes';
import { capitalizeFirstLetter } from '../../utils/componentUtils';
import '../../styles/single-ability-card.css';

function SingleAbilityCard(
  { 
    name, 
    description, 
  }: SingleAbilityData,
) {    
  return (
    <div className="single-ability-card-container">
      <p className="single-ability-card-name">{capitalizeFirstLetter(name)}</p>
      <div className="single-ability-card-description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SingleAbilityCard;