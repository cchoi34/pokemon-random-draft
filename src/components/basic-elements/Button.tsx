import React from 'react';
import '../../styles/button.css';
import '../../styles/text.css';

type ButtonProps = {
  text: string,
  disabled?: boolean
  onClick?: () => void,
}

function Button({ text, disabled, onClick }: ButtonProps) {
  const disabledClassName = disabled ? 'button-disabled' : 'button';
  return (
    <button
      type="button"
      className={`text-nav ${disabledClassName}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;