import React from 'react';
import '../../../style/Category.css'

const categories = [
  { id: 1, name: 'Điện thoại', count: 120, icon: '📱' },
  { id: 2, name: 'Tai nghe', count: 85, icon: '🎧' },
  { id: 3, name: 'Sạc dự phòng', count: 45, icon: '🔋' },
  { id: 4, name: 'Màn hình', count: 30, icon: '🖥️' },
  { id: 5, name: 'Bàn phím', count: 56, icon: '⌨️' },
];

const CategoryHome = () => {
  return (
    <section className="category-container">
      <h2 className="category-title">Danh mục sản phẩm</h2>
      
      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-item">
            <div className="category-info">
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </div>
            
            <span className="category-count">
              {cat.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryHome;