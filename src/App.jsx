import React, { useEffect, useState } from "react";
import { Toggle } from "./components/Toggle";
import { Buttons } from "./components/Buttons";
import { writeLoop } from "./components/typewriter"; 
import useLocalStorage from "use-local-storage";
import { Logo } from "./components/Logo";
import "./App.css";


// Images:
import linkedinImage from "./assets/linkedin.png";
import GithubImage from "./assets/github.png";

export const App = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  useEffect(() => {
    const typewriterElement = document.querySelector(".typewriter");
    if (typewriterElement) {
      writeLoop(typewriterElement, ["@new-york-city 🍎", "@chicago-il 🐻", "@los-angeles-metro 🌴", "@detroit-mi ⚙️", "perhaps ... @ann-arbor? 〽️👀", "\ndeveloping deployable, scalable models\noptimized for consumer-facing data dashboards"]);
    }
  }, []);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Logo></Logo>
      <Toggle 
        isChecked={isDark} 
        handleChange={() => setIsDark(!isDark)}
      />
      <h1 className="title">urban data analytics for <span className="typewriter"></span><span className="cursor">|</span></h1>
      <Buttons isDark={isDark} handleChange={() => setIsDark(!isDark)}/>
      <a href="https://www.linkedin.com/in/kensuke-f-210356202/">
        <img src={linkedinImage} className="linkedin-btn" alt="linkedin_icon"/>
      </a>
      <a href="https://github.com/kfukutom/Urban-Crime-Dashboard">
        <img src={GithubImage} className="github-btn" alt="github-icon"/>
      </a>
      <h1 className="michigan">copyright © 2024 ken-fukutomi 〽️</h1>
    </div>
  );
}

export default App;
