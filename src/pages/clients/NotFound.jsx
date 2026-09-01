import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const NotFound = (props) => {
    
    if (props.lastpage === '/home') {
        return <Navigate to="/" replace />;
    }
    if (props.lastpage === '/error') {
        return <Navigate to="/" replace />;
    }

  return (
    <div style={styles.container}>
      {/* Khối hiệu ứng con số 404 */}
      <div style={styles.codeWrapper}>
        <h1 style={styles.code}>404</h1>
        <span style={styles.badge}>Oops!</span>
      </div>

      {/* Nội dung thông báo */}
      <h2 style={styles.title}>Không tìm thấy trang</h2>
      <p style={styles.description}>
        Đường dẫn bạn truy cập không tồn tại hoặc đã bị xóa.
      </p>

      {/* Nút quay về trang chủ */}
      <Link to="/" style={styles.button}>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Quay lại trang chủ
      </Link>
    </div>
  );
};

// Style object viết trực tiếp trong file
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: '#ffffff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  codeWrapper: {
    position: 'relative',
    marginBottom: '10px',
  },
  code: {
    fontSize: 'clamp(6rem, 15vw, 10rem)',
    fontWeight: '900',
    margin: 0,
    lineHeight: 1,
    letterSpacing: '4px',
    opacity: 0.95,
    textShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
  badge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    color: '#f7175a',
    padding: '4px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '800',
    textTransform: 'uppercase',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
    fontWeight: '700',
    margin: '16px 0 8px 0',
  },
  description: {
    fontSize: '16px',
    color: '#f7175a',
    maxWidth: '420px',
    margin: '0 0 28px 0',
    lineHeight: 1.5,
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    color: '#f7175a',
    fontWeight: '700',
    fontSize: '15px',
    padding: '12px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
  },
};

export default NotFound;