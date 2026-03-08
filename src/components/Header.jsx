import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Settings } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import '../style/Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import axiosAuth from '../services/axiosAuth';
import { getCookie, setCookie, showDynamic } from '../app/ComponentSupport/functions';
import { resetProfile, updateProfile } from '../app/features/profileSlice';
import logo from '../assets/img/logo.png'
import SettingModal from '../pages/clients/SettingModal';
import { getProductClientALl } from '../services/ProductService';
import { setProducts } from '../app/features/productSlice';
import { toast } from 'react-toastify';
import { getNotifiIsland, setNotifiEamil, setNotifiIsland } from '../services/SettingService';
import { updateSetting } from '../app/features/settingSlice';
import { updateUser, updateUserClient } from '../services/UserService';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile)
  const dispatch =  useDispatch();
  const [showSetting, setShowSetting] = useState(false);
  const [statusNotifiIsland, setStatusNotifiIsland] = useState("on");
  const [statusSoundNotifiIsland, setStatusSoundNotifiIsland] = useState("on");
  const setting = useSelector((state) => state.setting);
   const getProductByName = async (product_name) => {
    
      if(!window.location.pathname.startsWith('/search/')){
          navigate(`/search/${searchTerm}`);
          return;
      }
      if(window.location.pathname.startsWith('/search/')){
        navigate(`/search/${searchTerm}`);
          window.location.reload()
          return;
      }
      const products = await getProductClientALl({product_name});
       if(products){
          dispatch(setProducts({
            data: products.data,
            product_name: product_name
          }))
      }
      if(products?.data?.length == 0){
        toast.warning("Không tìm thấy sản phẩm!")
      }
  }
  
   const setNotificationIsland = (status) => {
      setCookie("notifiisland",status, 10000);
      getNotificationIsland()
  }
  const setSoundNotificationIsland = (status) => {
      setCookie("soundnotifiisland",status, 10000);
      getSoundNotificationIsland()
  }
   const getSoundNotificationIsland = () => {
     const data = getCookie("soundnotifiisland");
     if(data === undefined || data === ""){
        setSoundNotificationIsland("on")
        return;
     }
    
     setStatusSoundNotifiIsland(data)
      dispatch(updateSetting({
      soundnotifiIsland: data
     }))
  }
  
  const getNotificationIsland = () => {
     const data = getCookie("notifiisland");
     if(data === undefined || data === ""){
        setNotificationIsland("on")
        return;
     }
    
     setStatusNotifiIsland(data)
      dispatch(updateSetting({
      notifiIsland: data
     }))
  }
  const setNotificationEmail = async () => {
      const data = await updateUserClient(dispatch, {
          notification_email: !setting.notifiEmail
      })
  }
  useState(() => {
      getNotificationIsland()
      getSoundNotificationIsland()
  }, [])
 
  const handleSearch = (e) => {
    e.preventDefault();
    // if (searchTerm.trim()) {
    //   // Chuyển hướng sang trang tìm kiếm với từ khóa
    //   navigate(`/search?q=${searchTerm}`);
    // }
    getProductByName(searchTerm)
    
  };
 
  const LogOut = async () => {
      await axiosAuth.post('auth/logout').then(() => {
          
          localStorage.removeItem('expires_in')
          localStorage.removeItem('access_token')
          localStorage.setItem("last-page_client", window.location.pathname)
          resetProfile()
          showDynamic(dispatch, 'Đăng xuất thành công');
          setTimeout(() => {
            window.location.reload();
          },1500)
      }).catch()
  }
  const handleSetShowSetting = () => {
    setShowSetting(false);      // Cập nhật state
  }
  return (
    <nav className="nav">
      <div className="container">
        {/* 1. Logo */}
        <Link to="/" className="logo">
          <img className="logo" src={logo} alt="logo"/>
          {/* <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Home</span> */}
        </Link>

        {/* 2. Thanh tìm kiếm */}
        <form onSubmit={handleSearch} className="search-box">
          <input 
            type="text" 
            placeholder="Bạn tìm điện thoại gì..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
          <button type="submit" className="search-btn">
            <Search size={18} />
          </button>
        </form>

        {/* 3. Menu điều hướng */}
        <div className="menu">
          {profile.email === '' ?
            <Link to="/login" className="menu-item">
              {/* < size={20} /> */}
              <span>Đăng nhập</span>
            </Link> 
          : 
            <div className="menu-item indentifi-position">
              <User size={20} />
              <span>Tài khoản của tôi
                <div className="account-modal">
                    <div className="account-list">
                        <div className="account-item">
                          <Link to="/profile">Thông tin tài khoản</Link>
                        </div>
                    </div>
                    
                    <div className="account-list">
                        <div className="account-item">
                          <Link to="/history-discounts" className="menu-item">
                            <span>Lịch sử giảm giá</span>
                        </Link>
                        </div>
                    </div>
                    <div className="account-list">
                        <div className="account-item">
                          <Link to="/my-orders" className="menu-item">
                            <span>Quản lý đơn hàng</span>
                        </Link>
                        </div>
                    </div>
                     <div className="account-list">
                        <div className="account-item" >
                          <Link  className="menu-item">
                            <span onClick={() => setShowSetting(true)}>Cài đặt</span>
                            {showSetting === true && <SettingModal setShowSetting={handleSetShowSetting} isNotification={profile.notification} profile={profile} dispatch={dispatch}/>}
                            
                        </Link>
                        </div>
                    </div>
                  <div className="account-list">
                      <div className="account-item" onClick={() => LogOut()}>
                          <span>Đăng xuất</span>
                        </div>
                        
                    </div>
                    
                </div>
              </span>
            </div>
          }
          <Link to="#" className="menu-item">
              <Settings size={20} />
              <span>Cài đặt</span>
              <div className="menu-item-popup">
                <div className="menu-item-popup-title">Cài đặt</div>
                <div className="menu-item-popup-body">
                    <div className="menu-item-popup-body-item">
                          <div className="menu-item-popup-body-item-title">Thông báo Island</div>
                          <div className="menu-item-popup-body-item-value" onClick={() => {
                                setNotificationIsland(statusNotifiIsland === "on" ? "off" : "on")
                          }}>{statusNotifiIsland === "on" ? <i class="bi bi-toggle-on"></i> : <i class="bi bi-toggle-off"></i>}</div>
                    </div>
                    <div className="menu-item-popup-body-item">
                          <div className="menu-item-popup-body-item-title">Âm thanh Thông báo Island</div>
                          <div className="menu-item-popup-body-item-value" onClick={() => {
                                setSoundNotificationIsland(statusSoundNotifiIsland === "on" ? "off" : "on")
                          }}>{statusSoundNotifiIsland === "on" ? <i class="bi bi-toggle-on"></i> : <i class="bi bi-toggle-off"></i>}</div>
                    </div>
                    {profile.id && 
                      <div className="menu-item-popup-body-item">
                            <div className="menu-item-popup-body-item-title">Nhận thông báo qua email</div>
                            <div className="menu-item-popup-body-item-value" onClick={() => {
                              setNotificationEmail();
                              dispatch(setNotifiEamil(dispatch, !setting.notifiEmail))
                            }}>{setting.notifiEmail === 1 ? <i class="bi bi-toggle-on"></i> : <i class="bi bi-toggle-off"></i>}</div>
                      </div>
                    }
                </div>
              </div>
            </Link> 
          {/* <Link to="/cart" style={styles.cartBtn}>
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={24} />
              <span style={styles.badge}>3</span>
            </div>
            <span>Giỏ hàng</span>
          </Link> */}
        </div>
      </div>
    </nav>
  );
}


export default Header;