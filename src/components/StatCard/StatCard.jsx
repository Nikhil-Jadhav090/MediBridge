import React from 'react';
import './StatCard.css';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue',
  trend,
  subtitle,
  className = '' 
}) => {
  return (
    <div className={`stat-card stat-card-${color} ${className}`}>
      <div className="stat-card-icon-wrapper">
        <Icon className="stat-card-icon" />
        <div className="stat-card-icon-glow"></div>
      </div>
      <div className="stat-card-info">
        <h4 className="stat-card-title">{title}</h4>
        <div className="stat-card-value">{value}</div>
        {subtitle && <p className="stat-card-subtitle">{subtitle}</p>}
        {trend && (
          <div className={`stat-card-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="stat-card-pulse"></div>
    </div>
  );
};

export default StatCard;
