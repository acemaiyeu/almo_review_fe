import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Chuyển hướng về trang '/' để kích hoạt lại SplashCheck kiểm tra server
    navigate('/', { replace: true });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Icon Offline/Disconnect */}
        <div style={styles.iconContainer}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f7175a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        </div>

        {/* Tiêu đề lỗi */}
        <h1 style={styles.title}>Không thể kết nối Server</h1>

        {/* Thông báo chi tiết */}
        <p style={styles.description}>
          Hệ thống không nhận được phản hồi từ máy chủ vào lúc này.
        </p>

        {/* Badge chú thích quan trọng */}
        <div style={styles.infoBadge}>
          <span style={styles.liveDot}></span>
          <p style={styles.infoText}>
            Lưu ý: Máy chủ chỉ hoạt động khi <strong>Almo live stream</strong>.
          </p>
        </div>

        {/* Nút kiểm tra / thử lại */}
        <button style={styles.button} onClick={handleRetry}>
          Kiểm tra lại kết nối
        </button>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0f1117', // Tông tối hài hòa với Flash Page
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: '#181b23',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '40px 28px',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
  },
  iconContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(247, 23, 90, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px auto',
    border: '1px solid rgba(247, 23, 90, 0.2)',
  },
  title: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 12px 0',
  },
  description: {
    color: '#8f9cae',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0 0 24px 0',
  },
  infoBadge: {
    backgroundColor: 'rgba(247, 23, 90, 0.08)',
    border: '1px solid rgba(247, 23, 90, 0.25)',
    borderRadius: '12px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '28px',
  },
  liveDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#f7175a',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'blink 1.5s infinite ease-in-out',
    flexShrink: 0,
  },
  infoText: {
    color: '#e2e8f0',
    fontSize: '13px',
    margin: 0,
    lineHeight: '1.4',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#f7175a',
    color: '#ffffff',
    border: 'none',
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
};

export default ErrorPage;