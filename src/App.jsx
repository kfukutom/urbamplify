import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { Toggle } from './components/Toggle';
import { Logo } from './components/Logo';
import './App.css';

import Home from './Home';
import About from './About';
import Auth from './Auth';
import Dashboard from './Dashboard';

export const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDark");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const location = useLocation(); // Get current route

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const handleChange = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div data-theme={isDark ? "dark" : "light"} className="App"> 
      {/* Conditionally render Logo */}
      {location.pathname !== '/dashboard' && <Logo />}
      
      <Toggle isChecked={isDark} handleChange={handleChange} />
      
      <Routes>
        <Route path="/" element={<Home isDark={isDark} handleChange={handleChange} />} />
        <Route path="/about" element={<About isDark={isDark} handleChange={handleChange}/>} />
        <Route path="/auth" element={<Auth isDark={isDark} handleChange={handleChange} />} />
        <Route path="/signup" element={<Auth isDark={isDark} handleChange={handleChange} />} />
        <Route path="/forgot-password" element={<Auth isDark={isDark} handleChange={handleChange} />} />
        <Route path="/dashboard" element={<Dashboard isDark={isDark} handleChange={handleChange} />} />
      </Routes>
    </div>
  );
};

export default App;