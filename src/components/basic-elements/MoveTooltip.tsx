import React, { useState, useEffect } from 'react';
import '../../styles/move-tooltip.css';
import { MovesStatusTypes } from '../../utils/dataTypes';

type MoveTooltipProps = {
  moveName: string,
  category: string,
  power: string,
  accuracy: string,
}

function Tooltip(
  { 
    moveName, 
    category, 
    power, 
    accuracy, 
  }: MoveTooltipProps,
) {
  return (
    <div className="move-tooltip-container">
      <p className="move-tooltip-move-name">Name: {moveName}</p>
      <p className="move-tooltip-move-name">Category: {category}</p>
      <p className="move-tooltip-move-name">Power: {power}</p>
      <p className="move-tooltip-move-name">Accuracy: {accuracy}</p>
    </div>
  );
}

export default Tooltip;