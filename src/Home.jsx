import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buttons } from "./components/Buttons";
import { writeLoop } from "./components/typewriter"; 
import "./screen-styles/Home.css";

import linkedinImage from "./assets/linkedin.png";
import GithubImage from "./assets/github.png";

export const Home = ({ isDark }) => {
  const navigate = useNavigate();
  const [isDimmed, setIsDimmed] = useState(false);

  useEffect(() => {
    const typewriterElement = document.querySelector(".typewriter");
    if (typewriterElement) {
      writeLoop(typewriterElement, [
        "@new-york-city 🗽 ",
        "@local-businesses ",
        "@community-orgs ",
        "@the-city ",
        "entrepreneurs ",
        "\nurban technologists. "
      ]);
    }
  }, []);

  // Function to navigate to the About page within the React app
  const handleNavigateToAbout = () => {
    navigate("/about");
  };
  return (
    <div
      className={`Home ${isDimmed ? "dimmed-background" : ""}`}
      data-theme={isDark ? "dark" : "light"}
    >
      <h1 className="title">
        urban analytics platform for <span className="typewriter"></span><span className="cursor">|</span>
      </h1>
      <Buttons
        isDark={isDark}
        handleNavigate={handleNavigateToAbout}
        onMouseEnter={() => setIsDimmed(true)}
        onMouseLeave={() => setIsDimmed(false)}
      />
      <a href="https://www.linkedin.com/in/kensuke-f-210356202/">
        <img src={linkedinImage} className="linkedin-btn" alt="linkedin_icon" />
      </a>
      <a href="https://github.com/kfukutom/Urban-Crime-Dashboard">
        <img src={GithubImage} className="github-btn" alt="github-icon" />
      </a>
      <h1 className="michigan">kfukutom © 2024 🔨</h1>
    </div>
  );
};

export default Home;