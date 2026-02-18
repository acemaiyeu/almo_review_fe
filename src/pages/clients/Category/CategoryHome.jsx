import React, { useEffect, useState } from 'react';
import '../../../style/Category.scss'
import { getCategoryClientALl } from '../../../services/CategoryService';
import { getProductClientALl } from '../../../services/ProductService';





const CategoryHome = ({sendToHome}) => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFull, setShowFull] = useState(false);
  const [categoryActive, setCategoryActive] = useState("")
  useEffect(() => {
      getCategories()
  }, [])

  const getCategories = async () => {
        const data = await getCategoryClientALl(1,1000);
        if(data){
            setCategories(
             data.data
            )
            setLoading(false)
        }
  }
  if(loading){
    return <div className="spin">
                    <div class="spinner-grow text-almo" role="status"></div>Đang tải loại sản phẩm...
                </div>;
  }
  const hanleClickCategory = async (category_name, category_code) => {
      setShowFull(false)
      sendToHome(category_name)
      setCategoryActive(category_code)
  }
  return (
    categories ? <section className={`category-container ${showFull ? 'active' : 'none-active'}`}>
      {/* <div className="category-container-modal-less"></div> */}
      <div className={`category-container-modal`} onClick={() => setShowFull(!showFull)}>{showFull ? 'Thu gọn' : 'Hiển thị thêm'}</div> 
     
      {/* <div className="category-container-modal">Thu gọn</div> */}
      <h2 className="category-title">Danh mục sản phẩm</h2>
      
      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.code} className={`category-item ${categoryActive === cat.code ? 'active' : ''}`} onClick={() => hanleClickCategory(cat.name, cat.code)}>
            <div className="category-info">
              <span className="category-icon"><img src={cat.thumbnail} loading='lazy'></img></span>
              <span className="category-name">{cat.name}</span>
            </div>
            
            <span className="category-count">
              {cat.total_products ?? 0}
            </span>
          </div>
        ))}
      </div>
    </section> : <div>Không tìm thấy loại sản phẩm</div>
  );
};

export default CategoryHome;