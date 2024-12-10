import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buttons } from "../components/Buttons";
import { writeLoop } from "../components/typewriter"; 
import "../screen-styles/Home.css";

import linkedinImage from "../assets/linkedin.png";
import GithubImage from "../assets/github.png";

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
        "@entrepreneurs ",
        "\nurban technologists. "
      ]);
    }
  }, []);

  const handleNavigateToAbout = () => {
    navigate("/about");
  };

  return (
    <div
      className={`Home ${isDimmed ? "dimmed-background" : ""}`}
      data-theme={isDark ? "dark" : "light"}
    >
      <video autoPlay loop muted className="background-video">
        <source src="https://video.wixstatic.com/video/6078b9_32212238f4a44b81960227b0cb681027/720p/mp4/file.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="title">
        urban analytics platform for <span className="typewriter"></span><span className="cursor">|</span>
      </h1>
      <Buttons
        isDark={isDark}
        handleNavigate={handleNavigateToAbout}
      />
      <a href="https://www.linkedin.com/in/kfukutom/">
        <img src={linkedinImage} className="linkedin-btn" alt="linkedin_icon" />
      </a>
      <a href="https://github.com/kfukutom/Urban-Crime-Dashboard">
        <img src={GithubImage} className="github-btn" alt="github-icon" />
      </a>
      <h1 className="michigan">urbamplify v1.2.2</h1>
    </div>
  );
};

export default Home;