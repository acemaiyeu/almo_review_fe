import React, { useState } from 'react';
import '../../style/AdminLogin.scss';
import axiosAuth from '../../services/axiosAuth';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosAuth.post('login', {
        ...formData
    }).then((res) => {
        localStorage.setItem('access_token_admin', res.access_token);
        let last_page = localStorage.getItem('last-page');
        localStorage.removeItem('last-page')
        if(last_page == 'null'){
          window.location.href = '/'
        }
        window.location.href = last_page
    }).catch()
    // Xử lý logic gọi API ở đây
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon"></div>
          <h1>ADMIN<span>PANEL</span></h1>
          <p>Hệ thống quản trị nội bộ</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="admin@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <label className="remember-me">
              <input type="checkbox" /> Ghi nhớ đăng nhập
            </label>
            <a href="#forgot" className="forgot-link">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="login-button">
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;