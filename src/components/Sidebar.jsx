import React from 'react';

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Documentation</h2>
      <ul style={styles.list}>
        <li style={styles.listHeader}><a href="#what-is-our-platform" style={styles.link}>I. Get Started</a></li>
        <li style={styles.listItem}><a href="#what-is-our-platform" style={styles.link}>What is Our Platform?</a></li>
        <li style={styles.listItem}><a href="#navigating-documentation" style={styles.link}>Navigating the Documentation</a></li>
        <li style={styles.listItem}><a href="#platform-components" style={styles.link}>Platform Components</a></li>
        <li style={styles.listItem}><a href="#user-guides" style={styles.link}>User Guides</a></li>
        <li style={styles.listHeader}><a href="#what-is-our-platform" style={styles.link}>II. User/Developers</a></li>
        <li style={styles.listItem}><a href="#what-is-our-platform" style={styles.link}>User Guide</a></li>
        <li style={styles.listItem}><a href="#navigating-documentation" style={styles.link}>Developer Guide</a></li>
        <li style={styles.listItem}><a href="#platform-components" style={styles.link}>Open-Source</a></li>
        <li style={styles.listItem}><a href="#user-guides" style={styles.link}>External</a></li>
        <li style={styles.listHeader}><a href="#what-is-our-platform" style={styles.link}>III. Admins</a></li>
        <li style={styles.listItem}><a href="#what-is-our-platform" style={styles.link}>Admin Guide</a></li>
        <li style={styles.listItem}><a href="#navigating-documentation" style={styles.link}>Deployment</a></li>
        <li style={styles.listItem}><a href="#platform-components" style={styles.link}>Security</a></li>
        <li style={styles.listItem}><a href="#user-guides" style={styles.link}>Compliance</a></li>
        <li style={styles.listHeader}><a href="#what-is-our-platform" style={styles.link}>IV. Support</a></li>
        <li style={styles.listItem}><a href="#what-is-our-platform" style={styles.link}>FAQ</a></li>
        <li style={styles.listItem}><a href="#navigating-documentation" style={styles.link}>Contact</a></li>
        <li style={styles.listItem}><a href="#platform-components" style={styles.link}>Resources</a></li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '20%',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto',
  },
  heading: {
    marginTop: '25.0px',
    color: '#333',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listHeader: {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  listItem: {
    marginBottom: '8px',
    paddingLeft: '15px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
};

export default Sidebar;