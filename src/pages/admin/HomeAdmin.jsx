import React from 'react';

const HomeAdmin = () => {
  const mainColor = '#f7175a';

  // Style chung cho các khối
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    borderLeft: `5px solid ${mainColor}`,
    flex: '1',
    minWidth: '200px'
  };

  const stats = [
    { label: 'Người dùng mới', value: '450', growth: '+5%', icon: '⭐' },
    { label: 'Lượt truy cập mới', value: '8,900', growth: '+18%', icon: '🔥' },
    { label: 'Tỷ lệ chuyển đổi', value: '12.5%', growth: '+2%', icon: '💎' },
  ];

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Hàng 1: Các khối chỉ số dùng Flexbox */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#888', fontSize: '12px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>{stat.label}</p>
                  <h3 style={{ fontSize: '28px', fontWeight: '900', margin: '5px 0', color: '#333' }}>{stat.value}</h3>
                </div>
                <span style={{ fontSize: '24px', backgroundColor: '#fff5f7', padding: '10px', borderRadius: '8px' }}>{stat.icon}</span>
              </div>
              <div style={{ marginTop: '10px', fontSize: '14px' }}>
                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>{stat.growth}</span>
                <span style={{ color: '#aaa', marginLeft: '5px' }}>so với tháng trước</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hàng 2: Khối biểu đồ lớn */}
        <div style={{ 
          backgroundColor: '#fff', 
          borderRadius: '15px', 
          padding: '30px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)' 
        }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#333', margin: 0 }}>Thống kê truy cập theo tuần</h2>
            <p style={{ color: '#999', fontSize: '14px', marginTop: '5px' }}>Đơn vị: Lượt truy cập</p>
          </div>

          {/* Khu vực biểu đồ dùng Flexbox */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'space-between', 
            height: '250px', 
            padding: '0 20px',
            borderBottom: '2px solid #f0f0f0'
          }}>
            {[40, 55, 30, 85, 45, 100, 75].map((val, i) => (
              <div key={i} style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: '15px'
              }}>
                {/* Cột biểu đồ */}
                <div style={{ 
                  width: '70%', 
                  maxWidth: '40px',
                  height: `${val * 2}px`, 
                  backgroundColor: val === 100 ? mainColor : '#ffdce5',
                  borderRadius: '6px 6px 0 0',
                  transition: '0.3s',
                  cursor: 'pointer'
                }}></div>
                {/* Nhãn bên dưới */}
                <span style={{ fontSize: '12px', color: '#888', fontWeight: '600' }}>
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeAdmin;