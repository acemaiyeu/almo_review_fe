import axios from 'axios';
import { toast } from 'react-toastify';
import { updateProfile } from '../app/features/profileSlice';

// 1. Tạo một instance của axios với các cấu hình cơ bản
const axiosAuth = axios.create({
  baseURL: 'http://localhost:8000/api/', // Thay bằng URL thật của bạn
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Sau 10 giây mà không phản hồi thì sẽ báo lỗi
});

// 2. Thiết lập Interceptor cho phía Gửi đi (Request)
// Thường dùng để tự động gắn Token vào mỗi khi gửi API
  const isAdminPage = location.pathname.startsWith('/admin');
axiosAuth.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('access_token');
    if(isAdminPage){
      token = localStorage.getItem('access_token_admin');
    }
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // return Promise.reject(error);
  }
);

// 3. Thiết lập Interceptor cho phía Nhận về (Response)
// Giúp bạn xử lý dữ liệu hoặc bắt lỗi tập trung một chỗ
axiosAuth.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'Đã xảy ra lỗi';

      switch (status) {
        case 401:
          if(location.pathname.startsWith('/login')){
            toast.error("Sai tài khoản hoặc mật khẩu");
          }else{
            toast.error("Phiên đăng nhập đã hết hạn");
          }
          
          localStorage.removeItem('access_token')
          localStorage.removeItem('expires_in')
          updateProfile({
            email: '',
            name: '',
            avatar: ''
          })

          break;
        case 404:
          toast.error('Không tìm thấy tài nguyên này!');
          break;
        case 500:
          toast.error('Lỗi server, vui lòng thử lại sau!');
          break;
        default:
          // Hiển thị mã lỗi status và thông báo từ API nếu có
          // console.error(`Lỗi hệ thống [${status}]:`, message);
          toast.error(`${message}`);
      }
    } else if (error.request) {
      // Trường hợp không nhận được phản hồi từ server (ví dụ: lỗi mạng)
      toast.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra internet.");
    } else {
      toast.error(`Lỗi: ${error.message}`);
    }
    if(isAdminPage){
        localStorage.removeItem('access_token_admin');
    }else{
        localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export default axiosAuth;