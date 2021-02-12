import React from 'react';
import '../../styles/start-sequence-header.css';
import '../../styles/text.css';

type StartSequenceHeaderProps = {
  header: string,
  subheader: string,
}

function StartSequenceHeader({ header, subheader }: StartSequenceHeaderProps) {
  return (
    <div className="start-sequence-header-container">
      <h2 className="start-sequence-header">{header}</h2>
      <p className="start-sequence-subheader">{subheader}</p>
    </div>
  );
}

export default StartSequenceHeader;