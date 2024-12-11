import React from 'react';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

function Documentation() {
  return (
    <div style={styles.app}>
      <Sidebar />
      <Content />
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Documentation;