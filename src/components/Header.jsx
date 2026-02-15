import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Phone, History, Package, User, Home } from 'lucide-react';
import { useState } from 'react';
import '../style/Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import axiosAuth from '../services/axiosAuth';
import { showDynamic } from '../app/ComponentSupport/functions';
import { resetProfile, updateProfile } from '../app/features/profileSlice';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile)
  const dispatch =  useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Chuyển hướng sang trang tìm kiếm với từ khóa
      navigate(`/search?q=${searchTerm}`);
    }
  };
  const LogOut = async () => {
    alert(window.location.pathname);
      await axiosAuth.post('auth/logout').then(() => {
          
          localStorage.removeItem('expires_in')
          localStorage.removeItem('access_token')
          localStorage.setItem("last-page_client", window.location.pathname)
          resetProfile()
          showDynamic(dispatch, 'Đăng xuất thành công');
          setTimeout(() => {
            window.location.reload();
          },1500)
      }).catch()
  }
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* 1. Logo */}
        <Link to="/" style={styles.logo}>
          <Home size={28} />
          {/* <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Home</span> */}
        </Link>

        {/* 2. Thanh tìm kiếm */}
        <form onSubmit={handleSearch} style={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Bạn tìm điện thoại gì..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.searchBtn}>
            <Search size={18} />
          </button>
        </form>

        {/* 3. Menu điều hướng */}
        <div style={styles.menu}>
          {profile.email === '' ?
            <Link to="/login" style={styles.menuItem}>
              {/* < size={20} /> */}
              <span>Đăng nhập</span>
            </Link> 
          : 
            <div style={styles.menuItem} className="indentifi-position">
              <User size={20} />
              <span>Tài khoản của tôi
                <div className="account-modal">
                    <div className="account-list">
                        <div className="account-item">
                          <Link to="/profile">Thông tin tài khoản</Link>
                        </div>
                    </div>
                    
                    <div className="account-list">
                        <div className="account-item">
                          <Link to="/history-discounts" style={styles.menuItem}>
                            <span>Lịch sử giảm giá</span>
                        </Link>
                        </div>
                    </div>
                    <div className="account-list">
                        <div className="account-item">
                          <Link to="/my-orders" style={styles.menuItem}>
                            <span>Quản lý đơn hàng</span>
                        </Link>
                        </div>
                    </div>
                  <div className="account-list">
                      <div className="account-item" onClick={() => LogOut()}>
                          <span>Đăng xuất</span>
                        </div>
                        
                    </div>
                    
                </div>
              </span>
            </div>
          }

          {/* <Link to="/cart" style={styles.cartBtn}>
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={24} />
              <span style={styles.badge}>3</span>
            </div>
            <span>Giỏ hàng</span>
          </Link> */}
        </div>
      </div>
    </nav>
  );
}

// CSS-in-JS cơ bản để bạn chạy được ngay
const styles = {
  nav: { background: 'var(--background-main)', padding: '10px 0', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px', padding: '0 15px' },
  logo: { display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000' },
  searchBox: { flex: 1, display: 'flex', background: '#fff', borderRadius: '4px', overflow: 'hidden' },
  input: { flex: 1, border: 'none', padding: '8px 12px', outline: 'none' },
  searchBtn: { border: 'none', background: 'none', padding: '0 10px', cursor: 'pointer' },
  menu: { display: 'flex', gap: '20px', alignItems: 'center' },
  menuItem: { textDecoration: 'none', color: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '1rem' },
  cartBtn: { textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '5px 12px', borderRadius: '4px' },
  badge: { position: 'absolute', top: '-8px', right: '-8px', background: 'red', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 5px' }
};

export default Header;