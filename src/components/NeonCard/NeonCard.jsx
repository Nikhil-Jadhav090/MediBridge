import React from 'react';
import './NeonCard.css';

const NeonCard = ({ 
  children, 
  title, 
  icon: Icon,
  className = '',
  glowColor = 'blue',
  ...props 
}) => {
  return (
    <div className={`neon-card neon-card-${glowColor} ${className}`} {...props}>
      {(title || Icon) && (
        <div className="neon-card-header">
          {Icon && <Icon className="neon-card-icon" />}
          {title && <h3 className="neon-card-title">{title}</h3>}
        </div>
      )}
      <div className="neon-card-content">
        {children}
      </div>
      <div className="neon-card-border"></div>
    </div>
  );
};

export default NeonCard;
