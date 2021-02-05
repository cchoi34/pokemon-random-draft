import React from 'react';
import { RuleCardData } from '../../utils/dataTypes';
import '../../styles/rule-card.css';

function RuleCard(props: RuleCardData) {
  return (
    <div className={`rule-card-container rule-card-${props.color}`}>
      <h2 className="rule-card-title text-subheader">{props.title}</h2>
      <p className="rule-card-description text-paragraph">{props.description}</p>
    </div>
  );
}

export default RuleCard;