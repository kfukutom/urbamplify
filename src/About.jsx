import React from 'react';
import './About.css';

export const About = () => {
  return (
    <div className="about-container">
      <div className="left-content">
        <h1><span className="highlight">Fund more.</span><br /><span className="Opposing">Build More<span/></span></h1>
      </div>
      <div className="right-content">
        <p>An AI-enabled platform capable of performing market-research and conducting community surveys to help local, small businesses get a head start.</p>
        <button className="demo-button">Book a demo</button>
      </div>
    </div>
  );
};

export default About;
