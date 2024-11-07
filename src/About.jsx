import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

// Local image dependencies
import linkedinImage from './assets/linkedin.png';
import githubImage from './assets/github.png';

export const About = ({ isDark }) => {
  const navigate = useNavigate();

  const navigateToAuth = () => navigate('/auth');

  return (
    <div className="about-page" data-theme={isDark ? 'dark' : 'light'}>
      <div className="spacer"></div>

      <section className="about-container">
        <div className="left-content">
          <h1>
            <span className="highlight">Fund More</span><br />
            <span className="opposing">Build More.</span>
          </h1>
        </div>
        <div className="right-content">
          <p>
            <span className="title-p">Urbamplify&nbsp;</span>
            is your ultimate partner for strategic growth, designed to help businesses elevate their reach and secure impactful funding for their projects. It fuels innovation, guiding enterprises to unlock their full potential and thrive in the dynamic landscape of our ever-evolving &nbsp;
            <span className="urbantech">urban environments</span>.
          </p>
          <button className="demo-button" onClick={navigateToAuth}>
            Book a Demo
          </button>
        </div>
      </section>

      <p className="separator"></p>

      <section className="about-ken">
        <h1 className="ut-header">Product's Focuses 🎯 </h1>
      </section>

      <section className="product-demo">
        <h1 className="ut">Urbamplify in Action (Product Demo)</h1>
      </section>

      <section className="workflow-div">
        <h1 className="workflow-header">Workflow Tool for Faster Analysis</h1>
        <p className="workflow-sub">
          Optimized for faster analysis, improved decision-making, and enhanced productivity.
        </p>
        <hr className="workflow-hr" />

        {/* YouTube Video Embed */}
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/h1oGkPLUI_k"
            title="Urbamplify in Action"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <h1 className="footer-lock">kfukutom © 2024 🔨</h1>
    </div>
  );
};

export default About;
