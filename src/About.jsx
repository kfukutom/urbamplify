import React from 'react';
import { useNavigate } from 'react-router-dom';
 import './About.css';

export const About = ({ isDark }) => {
  const navigate = useNavigate();

  const handleNavigateToLogIn = () => {
    navigate('/login');
  }

  const handleNavigateToTry = () => {
    navigate('/product-trial');
  }

  return (
    <div className="AboutPage" data-theme={isDark ? "dark" : "light"}>
      <div className="spacer"></div> 
      <section className="about-container">
        <div className="left-content">
          <h1>
            <span className="highlight">Fund more</span>
            <br />
            <span className="Opposing">Build More.</span>
          </h1>
        </div>
        <div className="right-content">
          <p>
            <span className="title-p">Urbamplify&nbsp;</span>
            serves as a tool to help businesses amplify their reach, and effectively fund their projects.
            I wanted to establish a product that helps businesses grow and reach their full potential amidst
            our ever-expanding <span className="urbantech">urban environments</span>.
          </p>
          <button className="demo-button" onClick={handleNavigateToLogIn}>
            Book a demo
          </button>
          <button className="try-button" onClick={handleNavigateToTry}>
            Try for free
          </button>
        </div>
      </section>

      <section className="about-ken">
        <h1 className="UT">
          Product's Focus
        </h1>
      </section>

      <section className="product-demo">
        <h1 className="UT_2">
          Urbamplify in Action (Product Demo)
        </h1>
      </section>

      <section className="blog">
        <h1>
          Blog
        </h1>
      </section>
    </div>
  );
};

export default About;
