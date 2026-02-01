import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Phone, History } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Chuyển hướng sang trang tìm kiếm với từ khóa
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* 1. Logo */}
        <Link to="/" style={styles.logo}>
          <Phone size={28} />
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>ALMO REVIEW</span>
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
          <Link to="/orders" style={styles.menuItem}>
            <History size={20} />
            <span>Lịch sử đơn hàng</span>
          </Link>

          <Link to="/cart" style={styles.cartBtn}>
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={24} />
              <span style={styles.badge}>3</span>
            </div>
            <span>Giỏ hàng</span>
          </Link>
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
  menuItem: { textDecoration: 'none', color: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' },
  cartBtn: { textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '5px 12px', borderRadius: '4px' },
  badge: { position: 'absolute', top: '-8px', right: '-8px', background: 'red', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 5px' }
};

export default Header;