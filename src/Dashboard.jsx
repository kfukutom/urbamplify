import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './screen-styles/Hamburger.css';
import { ClipLoader } from 'react-spinners';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Z1a3V0b20iLCJhIjoiY20yb3dlZHk0MGxjZzJrcHVleHE4cmV2cyJ9.qLU2UGh3fxhU7qvQuZskxw';

const Dashboard = ({ isDark, user }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [menuActive, setMenuActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [center, setCenter] = useState([-74.006, 40.7128]);
  const [cityName, setCityName] = useState('');
  const [businessMetric1, setBusinessMetric1] = useState(50);
  const [businessMetric2, setBusinessMetric2] = useState(50);
  const [businessMetric3, setBusinessMetric3] = useState(50);
  const [shakeInput, setShakeInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const drawInstance = useRef(null);

  useEffect(() => {
    setLoading(true);
    setMenuActive(true);
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
      const mapStyle = isDark ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/streets-v12';
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: center,
        zoom: zoomLevel,
      });

      drawInstance.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });

      mapInstance.current.addControl(drawInstance.current);

      mapInstance.current.on('zoom', () => {
        setZoomLevel(mapInstance.current.getZoom());
      });

      mapInstance.current.on('move', () => {
        const newCenter = mapInstance.current.getCenter();
        setCenter([newCenter.lng, newCenter.lat]);
        updateCityName(newCenter.lng, newCenter.lat);
      });

      mapInstance.current.on('draw.create', handleDrawCreate);
      mapInstance.current.on('draw.update', handleDrawUpdate);
      mapInstance.current.on('draw.delete', handleDrawDelete);

      return () => mapInstance.current.remove();
    }
  }, [loading]);

  useEffect(() => {
    if (mapInstance.current) {
      const mapStyle = isDark ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/streets-v12';
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
      } else {
        setShakeInput(true);
        setTimeout(() => setShakeInput(false), 820);
      }
    } catch (error) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 820);
    }
  };

  const handleDrawCreate = (e) => {
    console.log('Shape created:', e.features[0]);
  };

  const handleDrawUpdate = (e) => {
    console.log('Shape updated:', e.features[0]);
  };

  const handleDrawDelete = (e) => {
    console.log('Shape deleted:', e.features[0]);
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    if (!editMode) {
      drawInstance.current.changeMode('draw_polygon');
    } else {
      drawInstance.current.changeMode('simple_select');
    }
  };

  const clearAllDrawings = () => {
    drawInstance.current.deleteAll();
  };

  return loading ? (
    <div style={styles.loadingIcon}>
      <ClipLoader color="#333fff" loading={loading} size={75} />
    </div>
  ) : (
    <div className="dashboard-wrapper" style={styles.wrapper}>
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
      <div className="profile-icon">{/* Profile Icon */}</div>
      <button className={`hamburger ${menuActive ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="hamburger-bar"></div>
        <div className="hamburger-bar"></div>
        <div className="hamburger-bar"></div>
      </button>
      <div
        className={`navigation ${menuActive ? 'active' : ''}`}
        style={{
          ...styles.sidebarBase,
          ...(menuActive ? styles.sidebarOpen : styles.sidebarClosed),
        }}
      >
        <div style={styles.dashboardContent}>
          <h3 style={styles.heading}>Map Configuration</h3>
          <hr style={styles.hr} />
          <div style={styles.scrollableContent}>
            <label style={styles.label}>
              <p style={styles.cityTitle}>Enter Neighborhood Name:</p>
              <input
                className={`skibidi ${shakeInput ? 'shake' : ''}`}
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCitySearch()}
                style={styles.input}
                placeholder="e.g., Harlem, Astoria, etc."
              />
            </label>
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
            <label style={styles.label}>
              Business Metric 3:
              <input
                type="range"
                min="0"
                max="100"
                value={businessMetric3}
                onChange={(e) => setBusinessMetric3(Number(e.target.value))}
                style={styles.slider}
              />
              <span style={styles.metricValue}>{businessMetric3}</span>
            </label>
            <hr style={styles.hr2} />
            <button className="btn-draw" onClick={toggleEditMode}>
              {editMode ? 'Exit Draw Mode' : 'Enter Draw Mode'}
            </button>
            <button className="btn-clear" onClick={clearAllDrawings}>
              Clear All Drawings
            </button>
          </div>
        </div>
      </div>
      <div className="urbamplify-logo">
        <h2 className="form-title">
          <span style={{ color: isDark ? '#ffffff' : '#000000', fontWeight: 'bold', textShadow: '0.5px 0.2px 1px black' }}>urb</span>
          <span style={{ color: '#333fff', fontWeight: 'bold', textShadow: '0.5px 0.2px 1px black' }}>amplify&nbsp;</span>
          <span style={{ fontSize: 12, color: isDark ? '#ffffff' : '#000000' }}>v1.2.2</span>
        </h2>
      </div>
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
    top: '7px',
    right: '9px',
    padding: '10px 15px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
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
    transition: 'transform 0.4s ease-out',
    zIndex: 10,
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    paddingTop: '20px',
    paddingRight: '20px',
    paddingBottom: '5px',
    paddingLeft: '20px',
    width: '350px',
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
    marginTop: '25px',
    marginBottom: '10px',
    color: '#333fff',
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
    cursor: 'pointer',
  },
  metricValue: {
    marginLeft: '3.5px',
    fontWeight: 'bold',
    color: '#343333',
  },
  hr: {
    width: '100%',
    marginBottom: '10px',
    borderColor: '#ccc',
    borderWidth: '1px',
  },
  hr2 : {
    width: '100%',
    marginBottom: '20px',
    borderColor: '#ccc',
    borderWidth: '1px',
  },
  cityTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 'calc(15px + 85px)',
    right: '15px',
    padding: '10px 15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
    marginTop: '15px',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#333fff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Dashboard;