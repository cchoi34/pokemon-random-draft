import React from 'react';
import '../../styles/button.css';
import '../../styles/text.css';

enum ButtonWidthOptions {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

type ButtonProps = {
  text: string,
  width: ButtonWidthOptions,
  onClick?: () => void,
}

function Button({ text, width, onClick }: ButtonProps) {
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