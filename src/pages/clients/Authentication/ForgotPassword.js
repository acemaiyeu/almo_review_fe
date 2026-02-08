import React, { useState } from 'react';
import '../styles/Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Đăng nhập thành công!');
                // Lưu token vào localStorage hoặc xử lý logic tiếp theo
            } else {
                alert(data.message || 'Lỗi đăng nhập');
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            required 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input 
                            type="password" 
                            required 
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit">Lấy lại mật khẩu</button>
                </form>
                <div className="auth-footer">
                    <p><a href="/register">Đăng nhập</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;