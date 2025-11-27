import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MdLocalHospital, 
  MdDashboard, 
  MdPeople, 
  MdPersonAdd,
  MdEventNote,
  MdSettings,
  MdLogout,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';
import './Sidebar.css';

const Sidebar = ({ role, menuItems, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-logo">
        <MdLocalHospital className="sidebar-logo-icon" />
        {!isCollapsed && (
          <div className="sidebar-logo-text">
            <h2>MediBridge</h2>
            <p>{role}</p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
            title={item.label}
          >
            <item.icon className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
            <div className="sidebar-link-glow"></div>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button className="sidebar-logout" onClick={onLogout}>
        <MdLogout className="sidebar-icon" />
        {!isCollapsed && <span className="sidebar-label">Logout</span>}
      </button>

      {/* Collapse Toggle */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
      </button>

      {/* Decorative Elements */}
      <div className="sidebar-decoration top"></div>
      <div className="sidebar-decoration bottom"></div>
    </div>
  );
};

export default Sidebar;
