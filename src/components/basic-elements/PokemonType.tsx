import React, { useState, useEffect } from 'react';
import { PokemonTypes } from '../../utils/dataTypes';
import '../../styles/pokemon-type.css';

type PokemonTypeProps = {
  type: PokemonTypes,
}

function PokemonType({ type }: PokemonTypeProps) {
  function getColor(): string {
    return type.toString();
  }

  function getTypeText(): string {
    const first = type.substr(0, 1);
    const others = type.substr(1);
    return first.toUpperCase().concat(others);
  }

  return (
    <div className={`pokemon-type ${getColor()}`}>
      {getTypeText()}
    </div>
  );
}

export default PokemonType;