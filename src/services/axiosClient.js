import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../const/const';

// 1. Tạo một instance của axios với các cấu hình cơ bản
const axiosClient = axios.create({
  baseURL: `${API_URL}/api/client/`, // Thay bằng URL thật của bạn
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Sau 10 giây mà không phản hồi thì sẽ báo lỗi
});

// 2. Thiết lập Interceptor cho phía Gửi đi (Request)
// Thường dùng để tự động gắn Token vào mỗi khi gửi API
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Thiết lập Interceptor cho phía Nhận về (Response)
// Giúp bạn xử lý dữ liệu hoặc bắt lỗi tập trung một chỗ
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'Đã xảy ra lỗi';
      localStorage.setItem('last-page_client', window.location.pathname);
      switch (status) {
        case 401:
          toast.error("Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập để sử dụng tính năng này!");
          localStorage.removeItem('access_token')
          localStorage.removeItem('expires_in')
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
    return Promise.reject(error);
  }
);

export default axiosClient;