import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buttons } from "./components/Buttons";
import { writeLoop } from "./components/typewriter"; 
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
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
        "@entrepreneurs ",
        "\nurban technologists. "
      ]);
    }
  }, []);

  const handleNavigateToAbout = () => {
    navigate("/about");
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: isDark ? "#ffffff" : "#000000"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: isDark ? "#ffffff" : "#000000",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  return (
    <div
      className={`Home ${isDimmed ? "dimmed-background" : ""}`}
      data-theme={isDark ? "dark" : "light"}
    >
      <div className="header-line"></div>
      <div className="sub-header-line"></div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
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