import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/clients/Home'
import HomeAdmin from './pages/admin/Home';
import { useSelector, useDispatch } from 'react-redux';
import ProductDetail from './pages/clients/Products/ProductDetail'
import { useLocation } from 'react-router-dom';
import MenuAdmin from './pages/admin/MenuAdmin'
import ManageProduct from './pages/admin/ManageProduct'

function App() {
  const profile = useSelector((state) => state.profile)
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  return (
    <div className={`${isAdminPage ? 'page-admin' : ''}`}>
      {isAdminPage ?<MenuAdmin /> : <Header />}
      {/* <Header /> */}
      <div 
      // style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}
      style={{paddingLeft: '10px',paddingRight: '10px'}}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/orders" element={<div>Trang lịch sử đơn hàng</div>} />
          <Route path="/search" element={<div>Trang kết quả tìm kiếm</div>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          {/* Trang 404 nếu không tìm thấy route */}
          


          {/* //Admin */}
          <Route path="/admin/" element={HomeAdmin} />
           <Route path="/admin/manage-products" element={<ManageProduct />} />
           <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
        </Routes>
        
      </div>
    </div>
  )
}

export default App
