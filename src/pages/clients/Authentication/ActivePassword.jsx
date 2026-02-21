import React, { use, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activePasswordUser } from '../../../services/UserService';

const ActivePassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    
    // Trạng thái xử lý: 'loading', 'success', hoặc 'error'
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('Đang kích hoạt mật khẩu mới, vui lòng đợi trong giây lát...');


    const dispatch = useDispatch();
    
    useEffect(() => {
            activatePassword(params.password)
    }, []);

    const activatePassword = async (password) => {
        const data = await activePasswordUser(dispatch, password)
        console.log("data", data?.status === "error");
        if(data?.status === "error"){
                setStatus('error');
                setMessage('Có lỗi xảy ra hoặc liên kết đã hết hạn.');
                return;
        }
            setStatus('success');
            setMessage('Kích hoạt mật khẩu thành công!');

    }

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            textAlign: 'center'
        },
        card: {
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            width: '100%'
        },
        icon: {
            fontSize: '48px',
            marginBottom: '20px',
            color: 'var(--background-main, #f7175a)'
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#333'
        },
        button: {
            marginTop: '25px',
            padding: '12px 25px',
            backgroundColor: 'var(--background-main, #f7175a)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'opacity 0.3s'
        },
        loadingSpinner: {
            border: '4px solid #f3f3f3',
            borderTop: '4px solid var(--background-main, #f7175a)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
            </style>
            
            <div style={styles.card}>
                {status === 'loading' && <div style={styles.loadingSpinner}></div>}
                {status === 'success' && <div style={styles.icon}>✅</div>}
                {status === 'error' && <div style={{...styles.icon, color: '#ff4d4f'}}>❌</div>}

                <h2 style={styles.title}>{message}</h2>

                {status === 'success' && (
                    <>
                        <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
                            Vui lòng đăng nhập vào hệ thống và tiến hành <strong>đổi mật khẩu</strong> ngay để đảm bảo tính bảo mật cho tài khoản của bạn.
                        </p>
                        <button 
                            style={styles.button} 
                            onClick={() => navigate('/login')}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                        >
                            Đến trang Đăng nhập
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default ActivePassword;