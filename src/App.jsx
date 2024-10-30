import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Toggle } from './components/Toggle';
import './App.css';

import Home from './Home';
import About from './About';

export const App = () => {
  const [isDark, setIsDark] = useState(false);

  const handleChange = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div data-theme={isDark ? "dark" : "light"} className="App">
      {/* Toggle Button to switch theme */}
      <Toggle isChecked={isDark} handleChange={handleChange} />

      {/* Routes for Page Switching */}
      <Routes>
        <Route path="/" element={<Home isDark={isDark} handleChange={handleChange} />} />
        <Route path="/about" element={<About isDark={isDark} handleChange={handleChange} />} />
      </Routes>
    </div>
  );
};

export default App;
