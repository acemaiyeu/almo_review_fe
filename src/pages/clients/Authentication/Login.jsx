import React, { useState } from 'react';
import '../../../style/Auth.css';
import axiosAuth from '../../../services/axiosAuth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { showDynamic } from '../../../app/ComponentSupport/functions';

const Login = () => {
   const [formData, setFormData] = useState({ email: '', password: ''});
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
            await axiosAuth.post('/login', {
                ...formData
            }).then((res) => {
                if(res){
                    localStorage.setItem('access_token', res.access_token)
                    localStorage.setItem('expires_in', res.expires_in)
                    showDynamic(dispatch,"Đăng nhập thành công!");
                    let last_page = localStorage.getItem('last-page_client');
                    localStorage.removeItem('last-page_client')
                    showDynamic(dispatch,"Đăng nhập thành công!");
                    setTimeout(() => {
                    if(last_page == null){
                        window.location.href = '/'
                    }else{
                        window.location.href = last_page
                    }
                    },1500)
                    
                }
                
                
            }).catch()
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
                    <button className="button-submit" type="submit">Đăng Nhập</button>
                </form>
                <div className="auth-footer">
                    <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
                    <p><a href="/forgot-password">Quên mật khẩu?</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;