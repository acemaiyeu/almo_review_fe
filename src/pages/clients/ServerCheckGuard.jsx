import React, { useState, useEffect } from 'react';

const ServerCheckGuard = ({ 
  checkUrl, 
  children, 
  errorPage 
}) => {
  // Trạng thái: 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('loading');

  const checkServer = async () => {
    setStatus('loading');
    try {
      // Gọi API health check
      const response = await fetch(checkUrl, { method: 'GET' });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Lỗi kết nối server:', error);
      setStatus('error');
    }
  };

  useEffect(() => {
    checkServer();
  }, [checkUrl]);

  // 1. Màn hình Loading
  if (status === 'loading') {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: '16px', color: '#555', fontSize: '18px' }}>
          Đang kiểm tra kết nối hệ thống...
        </p>

        {/* CSS Keyframes cho Spinner */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // 2. Màn hình Không hoạt động (Hiển thị UI Error mặc định hoặc truyền từ bên ngoài vào)
  if (status === 'error') {
    if (errorPage) {
      return errorPage;
    }

    return (
      <div style={{ ...styles.centerContainer, backgroundColor: '#f8f9fa' }}>
        <div style={styles.errorCard}>
          <h1 style={{ color: '#d9534f', fontSize: '28px', marginBottom: '10px' }}>
            ⚠️ Máy chủ không hoạt động
          </h1>
          <p style={{ color: '#6c757d', fontSize: '15px', marginBottom: '20px' }}>
            Hệ thống hiện tại đang bảo trì hoặc không thể kết nối. Vui lòng thử lại sau.
          </p>
          <button style={styles.retryButton} onClick={checkServer}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // 3. Nếu thành công -> Trả về giao diện Main (truyền qua children)
  return <>{children}</>;
};

// Inline Styles dùng riêng cho Guard & Loading UI
const styles = {
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #f7175a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorCard: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
  },
  retryButton: {
    backgroundColor: '#f7175a',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ServerCheckGuard;