import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toggle } from './components/Toggle';
import { Logo } from './components/Logo';
import './screen-styles/App.css';
import './components/Ribbon.css';

import Home from './Home';
import About from './About';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Documentation from './Docs';
import Team from './Team';

export const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDark");
    
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleClickButton = (event) => {
      if (menuRef.current && menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = () => {
    setIsDark((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navigateToDocumentation = () => {
    navigate('/documentation');
    setMenuOpen(false);
  };

  const navigateToAuth = () => {
    navigate('/auth');
    setMenuOpen(false);
  }

  const navigateToTeam = () => {
    try {
      navigate('/team');
      setMenuOpen(false);
    }
    catch (err) {
      console.error(err);
      console.log("Failed to navigate at: ", new Date().toLocalTimeString());
    } finally {
      console.log("Navigation Attempt Successful at: ", new Date().toLocaleTimeString());
    }
  }

  return (
    <div data-theme={isDark ? "dark" : "light"} className="App"> 
      <Toggle 
        isAbout={location.pathname === '/about'} 
        isChecked={isDark}
        handleChange={handleChange} 
      />
      <div className="menu-container" ref={menuRef}>
        <button 
          className="menu-button" 
          onClick={toggleMenu}
          data-theme={isDark ? 'dark' : 'light'}
        >
          {menuOpen ? <span className="close-icon">×</span> : <span className="hamburger-icon">☰</span>}
        </button>
        <div className={`menu ${menuOpen ? 'open' : ''}`} data-theme={isDark ? 'dark' : 'light'}>
          <button onClick={navigateToAuth}className="download-button" data-theme={isDark ? 'dark' : 'light'}>Book a Demo</button>
          <ul className="menu-items" data-theme={isDark ? 'dark' : 'light'}>
            <li onClick={navigateToTeam}>Our Team</li>
            <li onClick={navigateToDocumentation}>Documentation</li>
            <li>Community</li>
            <li>Support</li>
          </ul> 
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home isDark={isDark} handleChange={handleChange} />} />
        <Route path="/about" element={<About isDark={isDark} handleChange={handleChange} />} />
        <Route path="/auth" element={<Auth isDark={isDark} handleChange={handleChange} />} />
        <Route path="/signup" element={<Auth isDark={isDark} handleChange={handleChange} />} />
        <Route path="/forgot-password" element={<Auth isDark={isDark} handleChange={handleChange} />} />
        <Route path="/dashboard" element={<Dashboard isDark={isDark} handleChange={handleChange} />} />
        <Route path="/documentation" element={<Documentation isDark={isDark} handleChange={handleChange} />} />
        <Route path="/team" element={<Team isDark={isDark} handleChange={handleChange} />} />
      </Routes>
    </div>
  );
};

export default App;// fixed hamburger as is!