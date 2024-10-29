import React, { useEffect, useState } from "react";
import { Toggle } from "./components/Toggle";
import { Buttons } from "./components/Buttons";
import { writeLoop } from "./components/typewriter"; 
import useLocalStorage from "use-local-storage";
import { Logo } from "./components/Logo";
import "./App.css";

import linkedinImage from "./assets/linkedin.png";
import GithubImage from "./assets/github.png";

export const About = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  return (
    <div className={`About ${isFading ? "fade-out" : ""}`} data-theme={isDark ? "dark" : "light"}>
      <Logo />
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <a href="https://www.linkedin.com/in/kensuke-f-210356202/">
        <img src={linkedinImage} className="linkedin-btn" alt="linkedin_icon" />
      </a>
      <a href="https://github.com/kfukutom/Urban-Crime-Dashboard">
        <img src={GithubImage} className="github-btn" alt="github-icon" />
      </a>
      <h1 className="michigan">copyright © 2024-fukutomi-ken 🔨</h1>
    </div>
  );
};

export default About;