import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toggle } from './components/Toggle';
import { Logo } from './components/Logo';
import './screen-styles/App.css';
import './components/Ribbon';

import Home from './screens/Home';
import About from './screens/About';
import Auth from './screens/Auth';
import Dashboard from './screens/Dashboard';
import Documentation from './screens/Docs';
import Team from './screens/Team';

export const App = () => {
  // Secure theme state management with safe parsing
  const getInitialTheme = useCallback(() => {
    try {
      const savedTheme = localStorage.getItem("appTheme");
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch (error) {
      console.warn('Theme retrieval error:', error);
      return false;
    }
  }, []);

  const [isDark, setIsDark] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Secure localStorage interaction
  useEffect(() => {
    try {
      localStorage.setItem("appTheme", JSON.stringify(isDark));
    } catch (error) {
      console.warn('Theme saving error:', error);
    }
  }, [isDark]);

  // Improve outside click handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        event.target instanceof Node && 
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    // Passive Event Listener for Secure Navigation (KEN)
    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 1. A route validation
  const safeNavigate = useCallback((path) => {
    // 2. Predefined valid routes
    const validRoutes = [
      '/auth', 
      '/documentation', 
      '/team', 
      '/', 
      '/about', 
      '/signup', 
      '/forgot-password', 
      '/dashboard',
      '/404',
    ];
    
    try {
      // Validate route before navigation
      if (!validRoutes.includes(path)) {
        navigate('/404');
        console.error('Attempted navigation to invalid route');
        return;
      }

      navigate(path);
      setMenuOpen(false);
    } catch (error) {
      navigate('/404');
      console.error('Navigation error:', error);
    }
  }, [navigate]);

  const sanitizeText = useCallback((text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }, []);

  const handleChange = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const menuItems = [
    { label: 'Our Team', path: '/team' },
    { label: 'Documentation', path: '/documentation' },
    { label: 'Community', path: '/community' },
    { label: 'Support', path: '/support' }
  ];

  return (
    <div 
      data-theme={isDark ? "dark" : "light"} 
      className="App"
      aria-label="Application Main Container"
    > 
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
          aria-expanded={menuOpen}
          aria-controls="main-menu"
        >
          {menuOpen ? <span className="close-icon">×</span> : <span className="hamburger-icon">☰</span>}
        </button>
        <div 
          id="main-menu"
          className={`menu ${menuOpen ? 'open' : ''}`} 
          data-theme={isDark ? 'dark' : 'light'}
          role="menu"
        >
          <button 
            onClick={() => safeNavigate('/auth')}
            className="download-button" 
            data-theme={isDark ? 'dark' : 'light'}
            type="button"
          >
            Book a Demo
          </button>
          <ul 
            className="menu-items" 
            data-theme={isDark ? 'dark' : 'light'}
            role="menu"
          >
            {menuItems.map((item) => (
              <li 
                key={item.label} 
                onClick={() => safeNavigate(item.path)}
                role="menuitem"
                dangerouslySetInnerHTML={{
                  __html: sanitizeText(item.label)
                }}
              />
            ))}
          </ul> 
        </div>
      </div>

      <Routes>
        {[
          { path: '/', Component: Home },
          { path: '/about', Component: About },
          { path: '/auth', Component: Auth },
          { path: '/signup', Component: Auth },
          { path: '/forgot-password', Component: Auth },
          { path: '/dashboard', Component: Dashboard },
          { path: '/documentation', Component: Documentation },
          { path: '/team', Component: Team }
        ].map(({ path, Component }) => (
          <Route 
            key={path} 
            path={path} 
            element={<Component isDark={isDark} handleChange={handleChange} />} 
          />
        ))}
      </Routes>
    </div>
  );
};

export default App;