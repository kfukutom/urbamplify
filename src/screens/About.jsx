import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import '../screen-styles/About.css';

// Local image dependencies
import linkedinImage from '../assets/linkedin.png';
import githubImage from '../assets/github.png';
import headerImage from '../assets/updated_header.svg';
import amazonLogo from '../assets/github.png';
import michiganVC from '../assets/v1.png';
import productDemo1 from '../assets/demo_ui_1.png';
import relativeSvg from '../assets/hammer-2.svg';
import engineeringLogo from '../assets/michigan_eng.jpg';
import taubmanLogo from '../assets/taubman.png';
import nycLogo from '../assets/nyc_edc.png';
import driveCapital from '../assets/drive.webp';
import cornellTech from '../assets/ctech.png';
import boundlessLogo from '../assets/boundlessventures.png';
import logo from '../favicon/value-amplify.svg';

export const About = ({ isDark }) => {
  const navigate = useNavigate();
  const [isInView, setIsInView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const demoRef = useRef(null);
  const chartRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigateToAuth = () => navigate('/auth');
  const navigateToDocumentation = () => navigate('/documentation');

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (demoRef.current) observer.observe(demoRef.current);
    return () => demoRef.current && observer.unobserve(demoRef.current);
  }, []);
  
  // NOTE: This is just a dummy data for the client feedback
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Monthly Active Users',
              data: [12000, 19000, 25000, 34000, 42000, 50000],
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
              fill: false,
            },
            {
              label: 'Revenue ($K)',
              data: [2450, 10080, 11120, 25180, 41250, 88320],
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: 'rgba(255, 255, 255, 0.7)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
            x: {
              ticks: { color: 'rgba(255, 255, 255, 0.7)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
          },
          plugins: {
            legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } },
          },
        },
      });

      return () => chart.destroy();
    }
  }, []);

  return (
    <div className="about-page" data-theme={isDark ? 'dark' : 'light'}>

      <section className="about-container">
        <div className="left-content">
          <h1>
            <span className="highlight">Fund More</span>
            <br />
            <span className="opposing">Build More.</span>
          </h1>
          <p className="opposing-below">
            {/*<img className="relative-svg" src={relativeSvg} alt="dashboard-alt" />*/}
            built by and for changemakers.
          </p>
        </div>

        <div className="right-content">
          <p className="right-text">
            <span className="title-p">Urbamplify&nbsp;</span> is your ultimate partner for strategic growth, designed
            to help businesses elevate their reach and secure impactful funding for their projects. It fuels
            innovation, guiding enterprises to unlock their full potential and thrive in the dynamic landscape of our
            ever-evolving&nbsp;<span className="urbantech">urban environments</span>.
          </p>
          <button className="demo-button" onClick={navigateToAuth}>
            Book a Demo
          </button>
          <button className="demo-button2" onClick={navigateToDocumentation}>
            Documentation
          </button>
        </div>
      </section>

      <section className="header-image">
        <div className="image-container">
          <img src={headerImage} alt="Urban innovation and technology representation" className="responsive-header-image" />
        </div>
      </section>

      <section className="about-ken">
        <div className="logo-ribbon">
          <div className="logo-ribbon-content">
            {[...Array(3)].map((_, index) => (
              <React.Fragment key={index}>
                <img src={amazonLogo} alt="Amazon" className="logo" />
                <img src={engineeringLogo} alt="Engineering" className="logo" />
                <img src={nycLogo} alt="NYCEDC" className="logo" />
                <img src={driveCapital} alt="Drive Capital Chicago" className="logo" />
                <img src={taubmanLogo} alt="Taubman" className="logo" />
                <img src={michiganVC} alt="MVC Capital" className="logo" />
                <img src={cornellTech} alt="Cornell Tech" className="logo" />
                <img src={boundlessLogo} alt="Boundless Ventures" className="logo" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="product-demo">
        <div className="demo1-content-container">
          <div className="demo1-image-container">
            <img 
              src={productDemo1} 
              alt="Product Demo" 
              className={`demo-image1 ${isInView ? 'slide-in' : ''}`} 
              ref={demoRef} 
            />
          </div>
          <div className="demo1-text-container" data-theme={isDark ? 'dark' : 'light'}>
            <h2 className="demo1-header"><span style={styles.highlightText}>See</span> Cities Better</h2>
              <p className="demo1-text">
                Our platform is designed to help <span style={styles.highlightText}>you</span> navigate the urban landscape with ultimate 
                ease and comfort. We've provided secure authentication to the platform, ensuring 
                your exploration of your business potentials are secured and valued.
              </p>
          </div>
        </div>
        <div className="demo2-content-container">
          <div className="demo2-text-container" data-theme={isDark ? 'dark' : 'light'}>
            <h2 className="demo1-header"><span style={styles.highlightText}>Envision</span> Your Business</h2>
            <p className="demo2-text" data-theme={isDark ? 'dark' : 'light'}>
                Elevate your business vision with our platform’s secure authentication and streamlined funding acquisition. Experience effortless navigation and user-friendly interfaces, all crafted with cutting-edge web technology. At the heart of our service, we prioritize your success and satisfaction, ensuring a seamless and impactful user experience that supports your business ambitions.
            </p>
          </div>
        </div>
      </section>

      <section className="workflow-div">
        <h2 className="workflow-header">We Value Your Experience & Success</h2>
        <p className="workflow-sub">Tracking our growth and user engagement</p>
        <hr className="workflow-hr" />
        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <h2 className="footer-title">Join the Urbamplify Waitlist 🚀</h2>
          <p className="skibidi-footer">
            we are all urban <span className="bold-skibidi">changemakers</span>.
          </p>
          <div className="subscribe-container">
            <input type="email" placeholder="name@email.com" className="email-input" />
            <button className="subscribe-button">Subscribe</button>
          </div>
          <div className="social-links">
            <a href="#" className="social-icon">
              Twitter
            </a>
            <a href="#" className="social-icon">
              Instagram
            </a>
            <a href="#" className="social-icon">
              Twitch
            </a>
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

// styles local
const styles = {
  highlightText: {
      color: '#333fff',
      fontWeight: 'bold',
  },
  communityFeedback: {
      padding: '60px 40px',
      backgroundColor: '#1b1b1d',
      marginTop: '40px'
  },
  feedbackHeader: {
      textAlign: 'center',
      marginBottom: '40px',
      color: '#ffffff',
      fontSize: '2.5rem',
      fontWeight: 700
  },
  cardsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto'
  },
  clientCard: {
      backgroundColor: '#242526',
      borderRadius: '12px',
      padding: '24px',
      color: '#ffffff',
      transition: 'transform 0.2s ease',
      '&:hover': {
          transform: 'translateY(-4px)'
      }
  },
  clientInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '20px'
  },
  clientAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      objectFit: 'cover'
  },
  clientDetails: {
      display: 'flex',
      flexDirection: 'column'
  },
  clientName: {
      fontWeight: 600,
      fontSize: '1.1rem'
  },
  clientHandle: {
      color: '#8c8c8c',
      fontSize: '0.9rem'
  },
  clientQuote: {
      fontSize: '1rem',
      lineHeight: 1.6,
      margin: 0,
      padding: 0,
      color: '#e6e6e6'
  },
  feedbackDate: {
      marginTop: '20px',
      color: '#8c8c8c',
      fontSize: '0.875rem'
  }
}