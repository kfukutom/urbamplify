import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './screen-styles/About.css';

// Local image dependencies
import linkedinImage from './assets/linkedin.png';
import githubImage from './assets/github.png';
import headerImage from './assets/updated_header.svg';
import carSvg from './assets/car-2.svg';
import productDemo1 from './assets/demo1.png';

export const About = ({ isDark }) => {
  const navigate = useNavigate();
  const [isInView, setIsInView] = useState(false);
  const demoRef = useRef(null);

  // Navigate to Auth page
  const navigateToAuth = () => navigate('/auth');

  // Intersection Observer for sliding in the image
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (demoRef.current) {
      observer.observe(demoRef.current);
    }

    return () => {
      if (demoRef.current) {
        observer.unobserve(demoRef.current);
      }
    };
  }, []);

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
          <p className="right-text">
            <span className="title-p">Urbamplify&nbsp;</span>
            is your ultimate partner for strategic growth, designed to help businesses elevate their reach and secure impactful funding for their projects. It fuels innovation, guiding enterprises to unlock their full potential and thrive in the dynamic landscape of our ever-evolving &nbsp;
            <span className="urbantech">urban environments</span>.
          </p>
          <button className="demo-button" onClick={navigateToAuth}>
            Book a Demo
          </button>
        </div>
      </section>

      <section className="header-image">
        <div className="image-container">
          <img 
            src={headerImage} 
            alt="Urban innovation and technology representation" 
            className="responsive-header-image" 
          />
        </div>
      </section>

      <section className="about-ken">
        <h1 className="ut-header">Product's Focuses 🎯</h1>
      </section>

      <section className="product-demo">
        <h1 className="ut">Urbamplify in Action (Product Demo)</h1>
        <img
          src={productDemo1}
          alt="Product Demo"
          className={`demo-image1 ${isInView ? 'slide-in' : ''}`}
          ref={demoRef}
        />
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
      
      <footer className="footer">
        <div className="footer-container">
          <h2 className="footer-title">Join the Urbamplify Waitlist 🚀</h2>
          <p className="skibidi-footer">urban changemakers | technologists | data analysts | people </p>
          <div className="subscribe-container">
            <input 
              type="email" 
              placeholder="name@email.com" 
              className="email-input"
            />
            <button className="subscribe-button">Subscribe</button>
          </div>
          <div className="social-links">
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">Twitch</a>
          </div>
          <div className="footer-info">
            <p className="copyright">© Urbamplify 2024, All Rights Reserved.</p>
            <p className="generation-date">Generated on November 30, 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;