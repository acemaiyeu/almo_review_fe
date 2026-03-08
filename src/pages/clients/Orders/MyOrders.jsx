import React, { use, useEffect, useState } from 'react';
import '../../../style/MyOrders.scss';
import { getOrderClientALl } from '../../../services/OrderService';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  
  const getMyOrders = async () => {
        const data = await getOrderClientALl([], 1, 10);
        if(data){
            setOrders(data.data)
        }
  }
  useEffect(() => {
        getMyOrders()
  }, [currentPage])

  const showMore = () => {
        if(currentPage >= totalPage){
            toast.error("Không còn dữ liệu để hiển thị")
            return;
        }
        setCurrentPage(currentPage + 1)
  }
  return (
    <div className="my-orders-container">
      <div className="content-wrapper">
        <header className="header">
          <h1>Đơn hàng của tôi</h1>
          <span className="order-count">{orders.length} đơn hàng</span>
        </header>
        <div className="search-box">
                {/* <div className="search-box-remove-text"></div> */}
                <input type='text' className="search-box-input" placeholder='Mã đơn hàng, tên sản phẩm, ngày tạo, đơn vị vận chuyển,...'></input>
                <button className="search-box-btn">Tìm kiếm</button>
        </div>
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="card-body">
                {/* Meta thông tin đơn hàng */}
                <div className="order-meta">
                  <div className="order-id-label">
                    Mã đơn: <span>{order.shipping_code}</span>
                  </div>
                  <div className={`status-badge ${order.unit_shipping}`}>
                    <div className="status-badge-title"> Đơn vị vận chuyển: </div><div className="status-badge-value">{order.unit_shipping}</div>
                  </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="product-info">
                  <img src={order.thumbnail} alt={order.product_name} className="product-img" />
                  <div className="details">
                    <h3>{order.product_name}</h3>
                    <div className="price-row">
                      <span className="price"><span className="price_title">Giá: </span><span className="price_value">{order.price} </span></span>
                      <span className="price"><span className="price_title">Phí ship: </span><span className="price_value"> {order.fee_ship}</span></span>
                      <span className="price"><span className="price_title">Tổng: </span><span className="price_value">  {order.total_price}</span></span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                <button className="btn-secondary">Ngày tạo: {order.created_at}</button>
              </div>

              </div>
            </div>
          ))}
        </div>
      </div>
       <div className="manage-box-paging">
                    <div className={`manage-box-paging-more ${currentPage >= totalPage ? 'visibled' : ''}`}  onClick={() => showMore()}>
                        Xem thêm
                    </div>
                </div>
    </div>
  );
};

export default MyOrders;