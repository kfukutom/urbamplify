import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RingLoader } from 'react-spinners';
import { getAuth } from 'firebase/auth';

const auth = getAuth();


const Dashboard = ({ isDark, user }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3500);
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('globalUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
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
        <p>Are you ready {username}?</p>
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
  },
  ready_p: {
    display: 'flex',
    textAlign: 'center',
  }
});

export default Dashboard;