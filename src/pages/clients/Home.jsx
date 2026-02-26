import { Link } from 'react-router-dom';
import { useFetch } from '../../services/useFetch.js';
import homeService from '../../services/homeService.js'
import { useEffect, useState } from 'react';
import WordEditor from '../../app/ComponentSupport/WordEditor.jsx';
import DisplayContent from '../../app/ComponentSupport/DisplayContent.jsx';
import DynamicIsland from './DynamicIsland.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateDynamic } from '../../app/features/dynamicIslandSlice.js';
import CategoryHome from './Category/CategoryHome.jsx';
import { getProductClientALl } from '../../services/ProductService.js';
import { toast } from 'react-toastify';
import logo from '../../assets/img/logo.png'
import '../../style/Home.scss'

const Home = () => {

// const { data: products, loading } = useFetch(homeService.getProducts, 123);
const [products, setProducts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPage, setTotalPage] = useState(1);
const [loading, setLoading] = useState(true);
const [params, setParams] = useState({
    sort: "new-product"
})
const {items: products_headers, loading_header} = useSelector((state) => state.products)
    const showProductByCategory = async (category_name) => {
      setLoading(true)
      setProducts([])
      if(category_name === "Tất cả"){
        category_name = "";
      }
      const data = await getProductClientALl({category_name}, 1, 10);
      if(data){
        if(data?.data.length > 0){
          // console.log("check", products.meta.pagination.total_pages)
          setLoading(true);
            setProducts(data.data)
            setTotalPage(data.meta.pagination.total_pages)
            setLoading(false);
        }else{
            setProducts([])
            setTotalPage(1)
            setCurrentPage(1)
        }
      }
      setLoading(false)
    }
    useEffect(() => {
     
        getProduct()
         
    }, [])
    const getProduct = async () => {
       setLoading(true);
        const data = await getProductClientALl(params, currentPage, 10);
        if(data){
          setProducts(data.data)
          setTotalPage(data.meta.pagination.total_pages)
        }
        setLoading(false);
    }
    useEffect(() => {
        if(products_headers.length > 0){
            setProducts(products_headers)
        }
    },[products_headers])

    const handleViewMore = async () => {
        setLoading(true)
        if(currentPage >= totalPage){
          toast.error("Đã hiển thị hết sản phẩm");
          return;
        }
        const data = await getProductClientALl(params, currentPage + 1, 10);
        if(data){
            const combinedList = [...products, ...data.data]; 
            setProducts(combinedList)
        }
        setCurrentPage(currentPage + 1);
        setLoading(false)
    }

    if (loading && products?.data?.length === 0) return <div className="spin">
        <div class="spinner-grow text-almo" role="status">
      </div>Đang tải sản phẩm...
      </div>;
       if (products?.data?.length === 0) return <div className="spin">
        <div class="spinner-grow text-almo" role="status">
      </div>Không tìm thấy sản phẩm
      </div>;
  return (
    <div style={styles.container}>
      
      {/* <button onClick={(() => handleNotifiDynamic())}>Test notifi Dynamic Island</button> */}
       <div className="category-box">
          <CategoryHome sendToHome={showProductByCategory}/>
        </div>
        <div className="sort-box">
            <select className="sort-box-select" onChange={(e) => 
              {
                setParams({
              ...params,
              sort: e.target.value
            })
            getProduct()
              }}>
                <option value="price-up" selected={params.sort === "price-up"}>Giá tăng dần</option>
                <option value="price-down" selected={params.sort === "price-down"}>Giá giảm dần</option>
                <option value="new-product" selected={params.sort === "new-product"}>Sản phẩm mới nhất</option>
            </select>
        </div>
      <div className="product-box">
       
        <h2 style={styles.title}>Sản phẩm mới nhất</h2>
        <div className="grid">
          {products && products.map((item) => (
            <div key={item.id} className="card">
               <div className="product-item-modal">
                {/* Sản phẩm không bán lại */}
            </div>
              <div className="modal-img"><img src={logo} alt="logo" /></div>
              <div style={styles.imageBox}>
                  <img src={item.thumbnail} alt={item.name} style={styles.image} loading='lazy' decoding="async"/>
              </div>
              <h3 style={styles.name}>{item.name}</h3>
              <h3 className="price">Giá mua: {item.price}</h3>
              
              <Link to={`/product/${item.slug}`} className='button-submit'>
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
        </div>
        {loading && <div className="spin">
                      <div class="spinner-grow text-almo" role="status">
                    </div>Đang tải sản phẩm...
                    </div> 
                    }
       <div className="manage-box-paging">
                    <div className={`manage-box-paging-more ${currentPage == totalPage ? 'visibled' : ''}`}  onClick={() => handleViewMore()}>
                        Xem thêm
                    </div>
                </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px 0', fontFamily: 'Arial, sans-serif', position: 'relative' },
  title: { fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' },
  imageBox: { height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' },
  image: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  name: { fontSize: '16px', fontWeight: '600', margin: '10px 0', height: '40px', overflow: 'hidden' },
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