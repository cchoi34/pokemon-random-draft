import React from 'react';
import '../../styles/button.css';
import '../../styles/text.css';

type ButtonProps = {
  text: string,
}

function Button({text}: ButtonProps) {
  return (
    <button type="button" className="button">
      {text}
    </button>
  );
}

export default Button;