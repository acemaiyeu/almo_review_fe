import React, { useState } from 'react';
import '../../../style/Auth.css';
import axiosAuth from '../../../services/axiosAuth';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '', name: '',  phone: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();
            await axiosAuth.post('/register', {
                ...formData
            }).then((res) => {
                toast.success('Đăng ký thành công!');
                console.log(res)
                // Lưu token vào localStorage hoặc xử lý logic tiếp theo
                localStorage.setItem('access_token', res.access_token)
                localStorage.setItem('expires_in', res.expires_in)
            }).catch()
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>Tên</label>
                        <input 
                            type="text" 
                            required 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            required 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input 
                            type="phone" 
                            required 
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                    <button className="button-submit" type="submit">Đăng Ký</button>
                </form>
                <div className="auth-footer">
                    <p>Đã có tài khoản? <a href="/register">Đăng nhập</a></p>
                    <p><a href="/forgot-password">Quên mật khẩu?</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;