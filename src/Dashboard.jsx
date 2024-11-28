import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './screen-styles/Hamburger.css';
import { RingLoader } from 'react-spinners';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Z1a3V0b20iLCJhIjoiY20yb3dlZHk0MGxjZzJrcHVleHE4cmV2cyJ9.qLU2UGh3fxhU7qvQuZskxw'; // Replace with your Mapbox access token

const Dashboard = ({ isDark, user }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [menuActive, setMenuActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [center, setCenter] = useState([-74.006, 40.7128]);
  const [cityName, setCityName] = useState('');
  const [businessMetric1, setBusinessMetric1] = useState(50);
  const [businessMetric2, setBusinessMetric2] = useState(50);
  const [errorMessage, setErrorMessage] = useState('');
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
      const mapStyle = isDark
        ? 'mapbox://styles/mapbox/dark-v10'
        : 'mapbox://styles/mapbox/streets-v12';

      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: center,
        zoom: zoomLevel,
      });

      mapInstance.current.on('zoom', () => {
        setZoomLevel(mapInstance.current.getZoom());
      });

      mapInstance.current.on('move', () => {
        const newCenter = mapInstance.current.getCenter();
        setCenter([newCenter.lng, newCenter.lat]);
        updateCityName(newCenter.lng, newCenter.lat);
      });

      return () => mapInstance.current.remove();
    }
  }, [loading]);

  // FIXED TODAY: KEN FUKUTOMI (2024)
  useEffect(() => {
    if (mapInstance.current) {
      const mapStyle = isDark
        ? 'mapbox://styles/mapbox/dark-v10'
        : 'mapbox://styles/mapbox/streets-v12';
      mapInstance.current.setStyle(mapStyle);
    }
  }, [isDark]);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const updateCityName = async (lng, lat) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        //locality test 1: neighborhood
        const neighborhood = data.features.find((feature) =>
          feature.place_type.includes('neighborhood') || feature.place_type.includes('locality')
        );

        const place = data.features.find((feature) => feature.place_type.includes('place'));

        if (neighborhood) {
          setCityName(neighborhood.text);
        } else if (place) {
          setCityName(place.text);
        } else {
          setCityName('Unknown');
        }
      }
    } catch (error) {
      console.error('Error fetching neighborhood name:', error);
      setCityName('Error fetching location');
    }
  };


  const handleCitySearch = async () => {
    if (!cityName) return;
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          cityName
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const [minLng, minLat, maxLng, maxLat] = feature.bbox || [
          feature.center[0] - 0.01,
          feature.center[1] - 0.01,
          feature.center[0] + 0.01,
          feature.center[1] + 0.01,
        ];

        mapInstance.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: 50,
            duration: 1000,
          }
        );

        const updatedCityName = feature.text;
        setCityName(updatedCityName);
        setErrorMessage('');
      } else {
        setErrorMessage('Location not found!');
      }
    } catch (error) {
      setErrorMessage('Error fetching location coordinates. Please try again.');
    }
  };

  return loading ? (
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
        <p style={styles.longLatText}>
          We're Currently in: <strong>{cityName || 'Unknown'}</strong>
        </p>
      </div>

      <div className="profile-icon">
        {/* Profile Icon */}
      </div>

      {/* Hamburger Button */}
      <button className={`hamburger ${menuActive ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="hamburger-bar"></div>
        <div className="hamburger-bar"></div>
        <div className="hamburger-bar"></div>
      </button>

      {/* Sidebar */}
      <div
        className={`navigation ${menuActive ? 'active' : ''}`}
        style={{
          ...styles.sidebarBase,
          ...(menuActive ? styles.sidebarOpen : styles.sidebarClosed),
        }}
      >
        <div style={styles.dashboardContent}>
          <h3 style={styles.heading}>Map Configuration 🔨</h3>
          <hr style={styles.hr} />
          <div style={styles.scrollableContent}>
            {/* City Input */}
            <label style={styles.label}>
              <p style={styles.cityTitle}>Enter City Name (Manhattan/NYC):</p>
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCitySearch()}
                style={styles.input}
                placeholder="e.g., Harlem, Astoria, etc."
              />
            </label>
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

            {/* Zoom Slider */}
            <label style={styles.label}>
              Zoom Level:
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={zoomLevel}
                onChange={(e) => {
                  const zoom = parseFloat(e.target.value);
                  setZoomLevel(zoom);
                  mapInstance.current.setZoom(zoom);
                }}
                style={styles.slider}
              />
              <span style={styles.metricValue}>{zoomLevel.toFixed(1)}</span>
            </label>

            {/* Business Metric 1 */}
            <label style={styles.label}>
              Business Metric 1:
              <input
                type="range"
                min="0"
                max="100"
                value={businessMetric1}
                onChange={(e) => setBusinessMetric1(Number(e.target.value))}
                style={styles.slider}
              />
              <span style={styles.metricValue}>{businessMetric1}</span>
            </label>

            {/* Business Metric 2 */}
            <label style={styles.label}>
              Business Metric 2:
              <input
                type="range"
                min="0"
                max="100"
                value={businessMetric2}
                onChange={(e) => setBusinessMetric2(Number(e.target.value))}
                style={styles.slider}
              />
              <span style={styles.metricValue}>{businessMetric2}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="map-container" style={styles.mapContainer}></div>
    </div>
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
    marginTop: '20px',
  },
  scrollableContent: {
    maxHeight: 'calc(100vh - 150px)',
    overflowY: 'auto',
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
    marginBottom: '10px',
    color: '#333333',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    fontSize: '14px',
    color: '#333333',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
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
  metricValue: {
    marginLeft: '10px',
    fontWeight: 'bold',
    color: '#333333',
  },
  hr: {
    width: '100%',
    marginBottom: '10px',
    borderColor: '#ccc',
    borderWidth: '1px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '14px',
  },
  cityTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
};

export default Dashboard;