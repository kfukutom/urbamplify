import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './screen-styles/Hamburger.css';
import { RingLoader } from 'react-spinners';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

mapboxgl.accessToken = 'pk.eyJ1Ijoia2Z1a3V0b20iLCJhIjoiY20yb3dlZHk0MGxjZzJrcHVleHE4cmV2cyJ9.qLU2UGh3fxhU7qvQuZskxw';

const Dashboard = ({ isDark, user }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [menuActive, setMenuActive] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [center, setCenter] = useState([-74.006, 40.7128]);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 4000);
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('globalUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: zoomLevel,
      });

      mapInstance.current.on('zoom', () => {
        setZoomLevel(mapInstance.current.getZoom());
      });

      mapInstance.current.on('move', () => {
        const newCenter = mapInstance.current.getCenter();
        setCenter([newCenter.lng, newCenter.lat]);
      });

      return () => mapInstance.current.remove();
    }
  }, [loading]);

  const toggleMenu = () => {
    if (menuActive) {
      setMenuActive(false);
      setTimeout(() => setMenuVisible(false), 300);
    } else {
      setMenuVisible(true);
      setTimeout(() => setMenuActive(true), 50);
    }
  };

  return (
    loading ? (
      <div style={styles.loadingIcon}>
        <RingLoader color="#333fff" loading={loading} size={150} />
      </div>
    ) : (
      <div className="dashboard-wrapper" style={styles.wrapper}>
        {/* Longitude/Latitude Container */}
        <div style={styles.longLatContainer}>
          <p style={styles.longLatText}>
            Longitude: <strong>{center[0].toFixed(4)}</strong>
          </p>
          <p style={styles.longLatText}>
            Latitude: <strong>{center[1].toFixed(4)}</strong>
          </p>
        </div>

        {/* Hamburger Button */}
        <button
          className={`hamburger ${menuActive ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <div className="hamburger-bar"></div>
          <div className="hamburger-bar"></div>
          <div className="hamburger-bar"></div>
        </button>

        {/* Sidebar */}
        {menuVisible && (
          <div
            className={`navigation ${menuActive ? 'active' : ''}`}
            style={{
              ...styles.sidebarBase,
              ...(menuActive ? styles.sidebarOpen : styles.sidebarClosed),
            }}
          >
            <div style={styles.dashboardContent}>
              <h3 style={styles.heading}>Map Configuration 🔨 </h3>
              <label style={styles.label}>
                Zoom Level: 
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => mapInstance.current.setZoom(parseFloat(e.target.value))}
                  style={styles.slider}
                />
                <span style={styles.zoomValue}>{zoomLevel.toFixed(1)}</span>
              </label>
            </div>
          </div>
        )}

        {/* Map Container */}
        <div ref={mapContainer} className="map-container" style={styles.mapContainer}></div>
      </div>
    )
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    position: 'relative',
  },
  longLatContainer: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    padding: '10px 15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  longLatText: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#333333',
  },
  sidebarBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#ffffff',
    transition: 'transform 0.3s ease-out',
    zIndex: 10,
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    padding: '20px',
    width: '300px',
  },
  sidebarClosed: {
    transform: 'translateX(-100%)',
  },
  sidebarOpen: {
    transform: 'translateX(0)',
  },
  dashboardContent: {
    marginTop: '50px',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  loadingIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333333',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    fontSize: '14px',
    color: '#333333',
  },
  slider: {
    width: '100%',
    margin: '10px 0',
    WebkitAppearance: 'none',
    background: '#e0e0e0',
    outline: 'none',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    borderRadius: '5px',
    height: '5px',
  },
  zoomValue: {
    marginLeft: '10px',
    fontWeight: 'bold',
    color: '#333333',
  },
};

export default Dashboard;