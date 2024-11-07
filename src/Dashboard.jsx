import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet } from 'react-native';
import { RingLoader } from 'react-spinners'; // Ensure this is imported

const Dashboard = ({ isDark }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3500);
  }, []);

  return (
    loading ? (
      <div style={styles.loadingIcon}>
        <RingLoader color="#333fff" loading={loading} size={150} />
      </div>
    ) : (
      <div className="dashboard-container" data-theme={isDark ? 'dark' : 'light'}>
        <h2 className="dashboard-title">Welcome to your dashboard</h2>
        <p className="dashboard-text">You have successfully logged in.</p>
      </div>
    )
  );
};

const styles = StyleSheet.create({
  loadingIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
});

export default Dashboard;
