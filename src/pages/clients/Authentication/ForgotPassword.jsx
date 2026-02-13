import React, { useState } from 'react';
import '../../../style/Auth.css';
import { showDynamic } from '../../../app/ComponentSupport/functions';
import { useDispatch } from 'react-redux';
import axiosAuth from '../../../services/axiosAuth';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: ''});
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        axiosAuth.post(`auth/forget-password`, {
            email: formData.email
        }).then(() => {
            showDynamic(dispatch, 'Vui lòng kiểm tra email để kích hoạt mật khẩu mới!')
        }).catch()
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Quên mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            required 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <button className='button-submit' type="submit">Lấy lại mật khẩu</button>
                </form>
                <div className="auth-footer">
                    <p><a href="/register">Đăng nhập</a></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;