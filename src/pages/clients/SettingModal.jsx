import React, { useState } from 'react';
import '../../style/SettingModal.scss';

const SettingModal = ({setShowSetting}) => {
  const [settings, setSettings] = useState([
    { id: 1, title: 'Thông báo sản phẩm mới', desc: 'Nhận email khi có sản phẩm vừa ra mắt.', active: true },
    { id: 2, title: 'Ưu đãi độc quyền', desc: 'Thông báo về các mã giảm giá cá nhân.', active: false },
    { id: 3, title: 'Cập nhật đơn hàng', desc: 'Trạng thái vận chuyển và giao hàng.', active: true },
  ]);

  const handleToggle = (id) => {
    setSettings(prev => 
      prev.map(item => item.id === id ? { ...item, active: !item.active } : item)
    );
  };

  return (
    <div className="overlay">
      <div className="setting-modal">
        <header className="modal-header">
          <h2>Cài đặt</h2>
          <button className="close-btn" onClick={() => setShowSetting()}>&times;</button>
        </header>

        <div className="setting-list">
          {settings.map((item) => (
            <div key={item.id} className="setting-item">
              <div className="setting-info">
                <span className="setting-title">{item.title}</span>
                <p className="setting-desc">{item.desc}</p>
              </div>
              
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={item.active} 
                  onChange={() => handleToggle(item.id)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
        
        <footer className="modal-footer">
          <button className="save-btn">Lưu thay đổi</button>
        </footer>
      </div>
    </div>
  );
};

export default SettingModal;