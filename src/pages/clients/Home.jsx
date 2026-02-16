import { Link } from 'react-router-dom';
import { useFetch } from '../../services/useFetch.js';
import homeService from '../../services/homeService.js'
import { useEffect, useState } from 'react';
import WordEditor from '../../app/ComponentSupport/WordEditor.jsx';
import DisplayContent from '../../app/ComponentSupport/DisplayContent.jsx';
import DynamicIsland from './DynamicIsland.jsx';
import { useDispatch } from 'react-redux';
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
  
    const showProductByCategory = (products) => {
      
      if(products?.data.length > 0){
        // console.log("check", products.meta.pagination.total_pages)
         setLoading(true);
          setProducts(products.data)
          setTotalPage(products.meta.pagination.total_pages)
          setLoading(false);
      }else{
           setProducts([])
          setTotalPage(1)
          setCurrentPage(1)
      }
    }
    useEffect(() => {
      setLoading(true);
        getProduct()
         setLoading(false);
    }, [])
    const getProduct = async () => {
        const data = await getProductClientALl([], currentPage, 10);
        if(data){
          setProducts(data.data)
          setTotalPage(data.meta.pagination.total_pages)
        }
    }

    const handleViewMore = async () => {
        setLoading(true)
        if(currentPage >= totalPage){
          toast.error("Đã hiển thị hết sản phẩm");
          return;
        }
        const data = await getProductClientALl([], currentPage + 1, 10);
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
          <CategoryHome showProduct={showProductByCategory}/>
        </div>
      <div className="product-box">
        <h2 style={styles.title}>Sản phẩm mới nhất</h2>
        <div style={styles.grid}>
          {products && products.map((item) => (
            <div key={item.id} style={styles.card}>
              <div className="modal-img"><img src={logo} alt="logo"/></div>
              <div style={styles.imageBox}>
                  <img src={item.thumbnail} alt={item.name} style={styles.image} loading='lazy'/>
              </div>
              <h3 style={styles.name}>{item.name}</h3>
              
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
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'relative'
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