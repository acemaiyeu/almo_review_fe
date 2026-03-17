import React, { useCallback, useEffect, useState, useRef } from 'react';
import '../../../style/DiscountHistory.scss';
import { getHistoryDiscountClientALl } from '../../../services/HistoryDiscountService';

const DiscountHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

//   const historyData = [
//     {
//       id: 1,
//       name: "Mèo máy Doraemon Phiên bản giới hạn 50 năm kỉ niệm",
//       thumb: "https://picsum.photos/200/200?random=1",
//       originalPrice: "1.500.000đ",
//       discount: 30,
//       finalPrice: "1.050.000đ",
//       time: "18/02/2026 14:30"
//     },
//     {
//       id: 2,
//       name: "Bánh rán nhân đậu đỏ truyền thống Nhật Bản (Set 6 cái)",
//       thumb: "https://picsum.photos/200/200?random=2",
//       originalPrice: "120.000đ",
//       discount: 15,
//       finalPrice: "102.000đ",
//       time: "18/02/2026 12:15"
//     },
//     {
//       id: 3,
//       name: "Túi thần kỳ đeo chéo thời trang vải canvas cao cấp",
//       thumb: "https://picsum.photos/200/200?random=3",
//       originalPrice: "450.000đ",
//       discount: 50,
//       finalPrice: "225.000đ",
//       time: "17/02/2026 09:00"
//     }
//   ];

//   const filteredData = historyData.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

 const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  
  const getHistoryData = async (params = {}) => {
        const data = await getHistoryDiscountClientALl(params, 1, 10);
        if(data){
            setHistoryData(data.data)
        }
  }
  useEffect(() => {
        getHistoryData()
  }, [currentPage])

  const showMore = () => {
        if(currentPage >= totalPage){
            toast.error("Không còn dữ liệu để hiển thị")
            return;
        }
        setCurrentPage(currentPage => currentPage + 1)
  }

const typingTimeoutRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    // 1. Xóa timeout cũ nếu người dùng vẫn đang gõ
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // 2. Thiết lập timeout mới (chờ 500ms sau khi ngừng gõ mới thực thi)
    typingTimeoutRef.current = setTimeout(() => {
      getHistoryData({product_name: e.target.value})
      setSearchTerm(value);
      
      // Ở đây bạn có thể gọi API hoặc checkTimeCache
      // const data = await checkTimeCache(value);
    }, 700);
  };

  return (
    <div className="discount-history-container">
      <header>
        <h1>Lịch sử săn sale</h1>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Tìm theo tên sản phẩm..." 
            defaultValuevalue={searchTerm}
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
      </header>

      <div className="history-list">
        {/* Table Header cho Desktop */}
        <div className="table-header">
          <span>Ảnh</span>
          <span>Tên sản phẩm</span>
          <span>Giá gốc</span>
          <span>Giảm giá</span>
          <span>Giá săn</span>
          <span style={{textAlign: 'right'}}>Thời gian</span>
        </div>

        {historyData.length > 0 ? historyData.map((item) => (
          <div key={item.id} className="history-item">
            <div className="thumb-wrapper">
              <img src={item.thumbnail} alt={item.product_name} />
            </div>
            
            <div className="product-name" title={item.product_name}>
              {item.product_name}
            </div>

            <div className="old-price">{item.price_product}</div>
            
            <div className="discount-tag">-{item.discount_percent}%</div>
            
            <div className="final-price">{item.price_discount}</div>
            
            <div className="time-stamp">{item.created_at}</div>
          </div>
        )) : (
          <div className="no-result">Không tìm thấy nào phù hợp.</div>
        )}
      </div>
      <div className="manage-box-paging">
                    <div className={`manage-box-paging-more ${currentPage >= totalPage ? 'visibled' : ''}`}  onClick={() => showMore()}>
                        Xem thêm
                    </div>
                </div>
    </div>
  );
};

export default DiscountHistory;