import React from 'react';

// Reusable Button Component
const Button = ({ label, onClick, className = "", style = {} }) => {
  return (
    <button
      className={`py-2 px-4 font-semibold rounded-lg shadow-md ${className}`}
      style={style}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
