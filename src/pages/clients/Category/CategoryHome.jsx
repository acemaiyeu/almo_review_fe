import React, { useEffect, useState } from 'react';
import '../../../style/Category.css'
import { getCategoryClientALl } from '../../../services/CategoryService';
import { getProductClientALl } from '../../../services/ProductService';





const CategoryHome = ({showProduct}) => {

  const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);

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
  const hanleClickCategory = async (category_name) => {
        // showProduct
      const products = await getProductClientALl({category_name}, 1, 10);
      if(products){
          showProduct(products);
      }
  }
  return (
    categories ? <section className="category-container">
      <h2 className="category-title">Danh mục sản phẩm</h2>
      
      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-item" onClick={() => hanleClickCategory(cat.name)}>
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