import React from 'react';
import '../../styles/rule-card.css';

type RuleCardProps = {
  title: string,
  description: string,
  color: string,
}

function RuleCard(props: RuleCardProps) {
  return (
    <div className={`rule-card-container rule-card-${props.color}`}>
      <h2 className="rule-card-title text-subheader">{props.title}</h2>
      <p className="rule-card-description text-paragraph">{props.description}</p>
    </div>
  );
}

export default RuleCard;