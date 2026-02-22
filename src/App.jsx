import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/clients/Home'
import { useSelector, useDispatch } from 'react-redux';
import ProductDetail from './pages/clients/Products/ProductDetail'
import { useLocation } from 'react-router-dom';
import MenuAdmin from './pages/admin/MenuAdmin'
import ManageProduct from './pages/admin/ManageProduct'
import DynamicIsland from './pages/clients/DynamicIsland'
import { toast, ToastContainer } from 'react-toastify'
import Login from './pages/clients/Authentication/Login.jsx'
import Register from './pages/clients/Authentication/Register.jsx'
import Profile from './pages/clients/Authentication/Profile.jsx'
import axiosAuth from './services/axiosAuth.js'
import { updateProfile } from './app/features/profileSlice.js'
import notifi_sound from './assets/audio/notifi.mp3'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import ManageCategory from './pages/admin/ManageCategory.jsx'
import ForgotPassword from './pages/clients/Authentication/ForgotPassword.jsx'
import Footer from './components/Footer.jsx'
import ManageUser from './pages/admin/ManageUser.jsx'
import About from './components/About.jsx'
import Terms from './components/Terms.jsx'
import InspectionPolicy from './components/InspectionPolicy.jsx'
import Policy from './components/Policy.jsx'
import MyOrders from './pages/clients/Orders/MyOrders.jsx'
import DiscountHistory from './pages/clients/DiscountHistory/DiscountHistory.jsx'
import './style/responsive.scss'
import Search from './pages/clients/Search.jsx'
import ActivePassword from './pages/clients/Authentication/ActivePassword.jsx'
import HomeAdmin from './pages/admin/HomeAdmin.jsx'

function App() {
  const profile = useSelector((state) => state.profile)
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginAdminPage = location.pathname.startsWith('/admin/login');
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
    if ((!isAdminPage && localStorage.getItem('access_token')) || (isAdminPage && localStorage.getItem('access_token_admin'))) {
      axiosAuth.get('auth/profile')
        .then((res) => {      
          // Destructure data from the axios response
          const { name, email, avatar, notification, role_code } = res.data; 
          
          dispatch(updateProfile({ name, email, avatar, notification, role_code}));
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
          // alert(isAdminPage)
          if(isAdminPage){
              window.location.href = "/admin/login"
          }
        });
    }
  }, [profile.email]); // Only re-run if email changes or dispatch is ready

  useEffect(() => {
  if (window.self !== window.top) {
    // Nếu web đang bị nhúng vào iframe, hãy đẩy nó ra ngoài hoặc xóa nội dung
    window.top.location.href = window.self.location.href;
  }
}, []);

  


  useEffect(() => {
      toast.warning("Web hiện tại chỉ demo chưa vận hành trực tiếp!")
  }, [])
  return (
    <div className={`${isAdminPage ? 'page-admin' : ''}`}>
       <ToastContainer position="top-right" style={{ top: "50px" }}/>
      {isAdminPage ? (!isLoginAdminPage ?  <MenuAdmin /> : <></>) : <Header />}
      {/* <Header /> */}
      <div 
      // style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}
      style={{paddingLeft: '10px',paddingRight: '10px'}}
      >
        <DynamicIsland />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} /> 
          <Route path="/search" element={<div>Trang kết quả tìm kiếm</div>} />
          <Route path="/product/:slug" element={<ProductDetail/>} />
         {/* Orders */}
         <Route path="/my-orders" element={<MyOrders/>} />

        {/* DiscountHistory */}
         <Route path="/history-discounts" element={<DiscountHistory/>} />

         {/* DiscountHistory */}
         <Route path="/search/:product_name" element={<Search/>} />

         {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/activate-password/:password" element={<ActivePassword />} />
          
          
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/inspection-policy" element={<InspectionPolicy />} />
          <Route path="/policy" element={<Policy />} />


          {/* //Admin */}
          <Route path="/admin/" element={<HomeAdmin/>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/manage-products" element={<ManageProduct />} />
          <Route path="/admin/manage-categories" element={<ManageCategory />} />
          <Route path="/admin/manage-users" element={<ManageUser />} />

          {/* Trang 404 nếu không tìm thấy route */}
          <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
        </Routes>
        <audio controls id="audio" style={{opacity: '0'}}>
            <source  src={notifi_sound} type="audio/ogg"/>
        </audio>
       <Footer />
      </div>
    </div>
  )
}

export default App
