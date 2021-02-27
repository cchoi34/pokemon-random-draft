import React from 'react';
import '../../styles/error-message.css';
import '../../styles/text.css';

type ErrorMessageProps = {
  message: string,
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="error-message">{message}</p>
  );
}

export default ErrorMessage;