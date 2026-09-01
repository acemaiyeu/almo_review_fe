import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { updatePublic } from '../../app/features/publicSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const SplashCheck = ({ timeout = 8000 }) => {
  const [redirect, setRedirect] = useState(null); // null | '/home' | '/error'
  const [statusText, setStatusText] = useState('Đang kết nối đến hệ thống...');
  const {check_server}= useSelector((state) => state.public)
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyServer = async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {

        clearTimeout(timer);

        if(check_server) {
          
          setStatusText('Kết nối thành công!');
          setTimeout(() => {setRedirect('/home'); dispatch(updatePublic({check_server: true})); }, 200);
          
        } else {
          setRedirect('/error');
        }
      } catch (e) {
        clearTimeout(timer);
        setRedirect('/error');
      }
    };

    verifyServer();
  }, [check_server, timeout]);

  // Điều hướng Router khi đã xác định trạng thái
  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  // Màn hình Loading Flash Page
  return (
    <div style={styles.splashContainer}>
      <div style={styles.logoBadge}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f7175a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      </div>

      <div style={styles.pulseWrapper}>
        <div style={styles.pulseRing}></div>
        <div style={styles.centerDot}></div>
      </div>

      <div style={styles.textGroup}>
        <h2 style={styles.title}>SYSTEM CHECK</h2>
        <p style={styles.subtitle}>{statusText}</p>
      </div>

      <div style={styles.progressBarTrack}>
        <div style={styles.progressBarFill}></div>
      </div>

      <style>{`
        @keyframes pulseWave {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 0.2; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @keyframes lineProgress {
          0% { left: -40%; width: 30%; }
          50% { width: 60%; }
          100% { left: 100%; width: 30%; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  splashContainer: {
    backgroundColor: '#0f1117',
    color: '#ffffff',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  logoBadge: {
    width: '72px',
    height: '72px',
    borderRadius: '20px',
    backgroundColor: 'rgba(247, 23, 90, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    border: '1px solid rgba(247, 23, 90, 0.2)',
  },
  pulseWrapper: {
    position: 'relative',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  pulseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '2px solid #f7175a',
    animation: 'pulseWave 1.8s infinite ease-in-out',
  },
  centerDot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#f7175a',
    borderRadius: '50%',
  },
  textGroup: {
    textAlign: 'center',
  },
  title: {
    fontSize: '13px',
    letterSpacing: '3px',
    color: '#8f9cae',
    margin: '0 0 6px 0',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: '15px',
    color: '#ffffff',
    margin: 0,
  },
  progressBarTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  progressBarFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#f7175a',
    animation: 'lineProgress 1.5s infinite ease-in-out',
  },
};

export default SplashCheck;