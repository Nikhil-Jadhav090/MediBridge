import React from 'react';
import './NeonButton.css';

const NeonButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={`neon-btn neon-btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="neon-btn-icon" />}
      <span className="neon-btn-text">{children}</span>
      <div className="neon-btn-glow"></div>
    </button>
  );
};

export default NeonButton;
