import React, { useState } from 'react';
import './Ribbon.css';

const MenuButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        {menuOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <span className="hamburger-icon">☰</span>
        )}
      </button>
      {menuOpen && (
        <div className="menu">
          <button className="download-button">Download</button>
          <ul className="menu-items">
            <li>Security</li>
            <li>Learn</li>
            <li>Explore</li>
            <li>Support</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuButton;