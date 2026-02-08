import { useEffect, useState } from 'react'
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
import DynamicIsland from './pages/clients/DynamicIsland'
import { ToastContainer } from 'react-toastify'
import Login from './pages/clients/Authentication/Login.jsx'
import Register from './pages/clients/Authentication/Register.jsx'
import Profile from './pages/clients/Authentication/Profile.jsx'
import axiosAuth from './services/axiosAuth.js'
import { updateProfile } from './app/features/profileSlice.js'
import notifi_sound from './assets/audio/notifi.mp3'

function App() {
  const profile = useSelector((state) => state.profile)
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const dispatch = useDispatch();
  // if(!profile.email || profile.email === ''){
  //   axiosAuth.get('auth/profile').then((res) => {
  //     useDispatch(updateProfile({
  //       name: res.name,
  //       email: res.email,
  //       avatar: res.avatar,
  //     }))
  //   }).catch()
  // }
  useEffect(() => {
    // Check if email is missing
    if (!profile.email || profile.email === '') {
      axiosAuth.get('auth/profile')
        .then((res) => {
          // Destructure data from the axios response
          const { name, email, avatar } = res.data; 
          
          dispatch(updateProfile({ name, email, avatar }));
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
        });
    }
  }, [profile.email, dispatch]); // Only re-run if email changes or dispatch is ready

  return (
    <div className={`${isAdminPage ? 'page-admin' : ''}`}>
       <ToastContainer />
      {isAdminPage ?<MenuAdmin /> : <Header />}
      {/* <Header /> */}
      <div 
      // style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}
      style={{paddingLeft: '10px',paddingRight: '10px'}}
      >
        <DynamicIsland />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/orders" element={<div>Trang lịch sử đơn hàng</div>} />
          <Route path="/search" element={<div>Trang kết quả tìm kiếm</div>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          {/* Trang 404 nếu không tìm thấy route */}
          


          {/* //Admin */}
          <Route path="/admin/" element={HomeAdmin} />
           <Route path="/admin/manage-products" element={<ManageProduct />} />
           <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
        </Routes>
        <audio controls id="audio" style={{opacity: '0'}}>
            <source  src={notifi_sound} type="audio/ogg"/>
        </audio>
       
      </div>
    </div>
  )
}

export default App
