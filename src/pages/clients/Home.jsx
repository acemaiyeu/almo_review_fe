import { Link } from 'react-router-dom';

const Home = () => {
  // Dữ liệu giả (Mock Data) thay cho việc gọi API
  const mockProducts = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 29990000, image: 'https://vcdn-sohoa.vnecdn.net/2023/09/13/iphone-15-pro-max-finish-select-202309-6-7-inch-natural-titanium-6261-1694565355.jpg' },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 26500000, image: 'https://images.samsung.com/is/image/samsung/p6pim/vn/2401/pd/samsung-galaxy-s24-ultra-titanium-gray-600x600.png' },
    { id: 3, name: 'Xiaomi 14 Ultra', price: 21990000, image: 'https://cdn.tgdd.vn/Products/Images/42/322616/xiaomi-14-ultra-trang-thumb-600x600.jpg' },
    { id: 4, name: 'Oppo Find X7 Ultra', price: 18500000, image: 'https://cdn.mobilecity.vn/mobilecity-vn/images/2024/01/oppo-find-x7-ultra-den.jpg' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📱 Điện thoại mới nhất</h2>
      
      <div style={styles.grid}>
        {mockProducts.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.imageBox}>
                <img src={item.image} alt={item.name} style={styles.image} />
            </div>
            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.price}>{item.price.toLocaleString()}đ</p>
            
            <Link to={`/product/${item.id}`} style={styles.btn}>
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px 0', fontFamily: 'Arial, sans-serif' },
  title: { fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', 
    gap: '20px',
  },
  card: { 
    border: '1px solid #ddd', 
    borderRadius: '12px', 
    padding: '15px', 
    textAlign: 'center',
    background: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  imageBox: { height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' },
  image: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  name: { fontSize: '16px', fontWeight: '600', margin: '10px 0', height: '40px', overflow: 'hidden' },
  price: { color: '#eb1c24', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' },
  btn: { 
    display: 'inline-block', 
    background: '#0071e3', 
    color: '#fff', 
    textDecoration: 'none', 
    padding: '8px 20px', 
    borderRadius: '20px',
    fontSize: '14px'
  }
};

export default Home;