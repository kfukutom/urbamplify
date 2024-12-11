import React from 'react';

function Content() {
  return (
    <div style={styles.content}>
      <h1 style={styles.mainHeading}>Getting Started 🚀</h1>
      
      <section id="what-is-our-platform">
        <h2 style={styles.sectionHeading}>What is Our Platform?</h2>
        <p style={{paddingTop: '10px', paddingBottom: '10px'}}>
          Our platform is a cutting-edge solution designed for advanced AI-powered analytics. It offers scalable, high-performance data processing for various data types, enabling real-time analytics with low latency. At its core are advanced AI algorithms that provide precise data analysis, complemented by intuitive interfaces for data visualization and system management. To streamline complex operations, we've integrated automated workflows that can handle even the most intricate processes.
        </p>
        <hr />
        <p style={{paddingTop: '10px'}}>
          Whether you're managing enterprise-level analytics or working on a personal project, our platform is built to adapt to your needs. It streamlines your workflow, accelerates insights, and empowers you to make data-driven decisions with confidence. From financial forecasting to healthcare predictive analytics, our versatile platform can be applied across various industries and scenarios.
        </p>
      </section>
      
      <section id="navigating-documentation">
        <h2 style={styles.sectionHeadingFollow}>Navigating the Documentation</h2>
        <p style={{paddingTop: '10px', paddingBottom: '10px'}}>
          To help you get the most out of our platform, we've organized our documentation into two main sections. The Guides section provides workflow-oriented instructions tailored for specific user roles, helping you quickly find the information most relevant to your needs. Our References section offers detailed information about platform components, serving as a comprehensive resource for when you need in-depth technical details.
        </p>
        <hr />
        <p style={{paddingTop: '10px', paddingBottom: '10px'}}>
          Navigation is simple: use the sidebar on the left to browse through all available pages. If you're looking for something specific, our search bar at the top of the page is designed to quickly locate the information you need. Whether you're a newcomer or an experienced user, our documentation is structured to support your journey in mastering our platform.
        </p>
        <p style={{textAlign: 'center'}}>
          . . . 
        </p>
        <div className="sliding-container">
          {/* Implement for later */}
        </div>
      </section>
      
      <section id="platform-components">
        <h2 style={styles.sectionHeadingFollow}>Platform Components</h2>
        <p style={{paddingTop: '10px'}}>
          Our platform is built on a robust set of components, each designed to enhance your data analytics capabilities. The AnalyticsEngine serves as the core, handling data processing and AI model execution with exceptional efficiency. For those who need to visualize their data, our Visualizer web application provides powerful tools for data visualization and system control.
        </p>
        <p style={{paddingTop: '10px'}}>
          We understand the importance of integration, which is why we offer both PythonSDK and JavaScriptSDK. These libraries allow seamless interaction with our platform, regardless of your preferred programming language. To round out our offerings, the AutomationEngine provides tools for creating and managing automated workflows, allowing you to streamline your processes and focus on what matters most - deriving insights from your data.
        </p>
      </section>
      
      <section id="user-guides">
        <h2 style={styles.sectionHeadingFollow}>User Guides</h2>
        <p style={{paddingTop: '10px'}}>
          Our platform caters to a diverse range of users, each with unique needs and expertise. For Data Scientists, we offer guides on exploring, analyzing, and automating data processing, enabling you to leverage the full power of our AI capabilities. Business Analysts will find resources on creating reports and dashboards, transforming raw data into actionable business insights.
        </p>
        <p style={{paddingTop: '10px'}}>
          IT Administrators aren't left out - we provide comprehensive guides on deploying and managing the platform across various environments, ensuring smooth operation and optimal performance. As our user base grows and evolves, we're continuously developing new guides to cover additional use cases and roles, making sure that every user can make the most of our platform, regardless of their specific needs or level of expertise.
        </p>
      </section>
    </div>
  );
}

const styles = {
  content: {
    width: '80%',
    marginLeft: '20%',
    padding: '20px',
  },
  mainHeading: {
    color: '#333',
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
    marginTop: '30px',
  },
  sectionHeading: {
    color: '#444',
    marginTop: '-20px',
  },
  sectionHeadingFollow: {
    color: '#444',
    marginTop: '-50px',
  },
};

export default Content;