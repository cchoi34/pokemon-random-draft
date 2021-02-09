import React from 'react';
import '../../styles/button.css';
import '../../styles/text.css';

type ButtonProps = {
  text: string,
  onClick?: () => void,
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="button text-nav"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;