import React, { useEffect, useState } from "react";
import { Toggle } from "./components/Toggle";
import { Buttons } from "./components/Buttons";
import { writeLoop } from "./components/typewriter"; 
import useLocalStorage from "use-local-storage";
import "./App.css";

export const App = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  useEffect(() => {
    const typewriterElement = document.querySelector(".typewriter");
    if (typewriterElement) {
      writeLoop(typewriterElement, ["New York City 🍎 ", "Chicago 🐻", "Los Angeles 🌴", "more coming soon! 👀"]);
    }
  }, []);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle 
        isChecked={isDark} 
        handleChange={() => setIsDark(!isDark)}
      />
      <h1 className="title">Urban Analytics for <span className="typewriter"></span><span className="cursor">|</span></h1>
      <Buttons isDark={isDark} handleChange={() => setIsDark(!isDark)}/>
    </div>
  );
}

export default App;
