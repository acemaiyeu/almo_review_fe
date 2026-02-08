import React, { useEffect, useState } from 'react';
import '../../../style/Profile.scss'
import { useDispatch, useSelector } from 'react-redux';
import axiosAuth from '../../../services/axiosAuth';
import { updateProfile } from '../../../app/features/profileSlice';
import { showDynamic } from '../../../app/ComponentSupport/functions';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Dữ liệu giả lập (Sau này bạn sẽ lấy từ Redux profile)
  const [userData, setUserData] = useState({
    name: profile.name,
    email: profile.email,
    avatar: profile.avatar,
    old_password: '',
    password: '',
    confirm_password: ''
  });
    async () => {
    // Check if email is missing
    if (!profile.email || profile.email === '') {
      await axiosAuth.get('auth/profile')
        .then((res) => {
          // Destructure data from the axios response
          const { name, email, avatar } = res.data; 
          
          dispatch(updateProfile({ name, email, avatar }));
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
        });
    }
  }
  useEffect(() => {
    setUserData({
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar
    })
  }, [profile.email])
    
  const handleChangePassword = () => {
    axiosAuth.post('auth/change-password', {
        old_password: userData.old_password, // State từ input
        new_password: userData.password, // State từ input
        new_password_confirmation: userData.confirm_password, // State từ input
    }).then((res) => {
        console.log(res);
        showDynamic(dispatch, "Đã đổi mật khẩu thành công!")
    }).catch()
  }

  return (
    <div className="profile-container">
      <div className="avatar-wrapper">
        <img src={userData.avatar} alt="Avatar" className="avatar-img" />
      </div>

      <div className="input-group">
        <label>Họ và tên</label>
        <input 
          type="text" 
          value={userData.name} 
          onChange={(e) => setUserData({...userData, name: e.target.value})} 
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input type="email" value={userData.email} disabled />
      </div>

      <button className="btn-main">Cập nhật thông tin</button>
      
      <button 
        style={{ background: 'none', color: 'var(--background-main)', border: 'none', marginTop: '15px', cursor: 'pointer' }}
        onClick={() => setIsModalOpen(true)}
      >
        Đổi mật khẩu?
      </button>

      {/* Popup Đổi mật khẩu */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={{ color: 'var(--background-main)' }}>Đổi mật khẩu</h3>
            <div className="input-group">
              <label>Mật khẩu cũ</label>
              <input type="password" placeholder="********" value={userData.old_password} onChange={(e) => {setUserData({
                ...userData,
                old_password: e.target.value
              })}}/>
            </div>
            <div className="input-group">
              <label>Mật khẩu mới</label>
              <input type="password" placeholder="********" value={userData.password} onChange={(e) => {setUserData({
                ...userData,
                password: e.target.value
              })}}/>
            </div>
             <div className="input-group">
              <label>Nhập lại mật khẩu mới</label>
              <input type="password" placeholder="********" value={userData.confirm_password} onChange={(e) => {setUserData({
                ...userData,
                confirm_password: e.target.value
              })}}/>
            </div>
            <button className="btn-main" onClick={() => handleChangePassword()}>Xác nhận đổi</button>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ width: '100%', background: '#eee', border: 'none', padding: '10px', marginTop: '10px', borderRadius: '8px' }}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;