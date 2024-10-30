import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Toggle } from "./components/Toggle";
import { Buttons } from "./components/Buttons";
import { writeLoop } from "./components/typewriter"; 
import useLocalStorage from "use-local-storage";
import { Logo } from "./components/Logo";
import "./Home.css";

import linkedinImage from "./assets/linkedin.png";
import GithubImage from "./assets/github.png";

export const Home = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const typewriterElement = document.querySelector(".typewriter");
    if (typewriterElement) {
      writeLoop(typewriterElement, [
        "@new-york-city 🗽 ",
        "@chicago-il 🍕 ",
        "@los-angeles-metro 🌆 ",
        "@detroit-mi ⚙️ ",
        "perhaps @ann-arbor? 〽️ ",
        "\nurban technologists. "
      ]);
    }
  }, []);

  // Function to navigate to the About page within the React app
  const handleNavigateToAbout = () => {
    navigate("/about"); // Programmatically navigate to /about
  };

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Logo />
      <h1 className="title">
        urban data analytics for <span className="typewriter"></span><span className="cursor">|</span>
      </h1>
      
      {/* Pass handleNavigateToAbout to the Buttons component */}
      <Buttons isDark={isDark} handleNavigate={handleNavigateToAbout} /> 
      
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

export default Home;
