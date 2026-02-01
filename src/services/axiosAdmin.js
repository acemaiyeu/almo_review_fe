import axios from 'axios';

// 1. Tạo một instance của axios với các cấu hình cơ bản
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/', // Thay bằng URL thật của bạn
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
    // Nếu API trả về dữ liệu thành công, mình chỉ lấy phần data thôi
    return response.data;
  },
  (error) => {
    // Xử lý lỗi tập trung
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Hết hạn phiên làm việc, đang chuyển hướng về Login...');
          // Ví dụ: window.location.href = '/login';
          break;
        case 404:
          console.error('Không tìm thấy tài nguyên này!');
          break;
        case 500:
          console.error('Lỗi server, vui lòng thử lại sau!');
          break;
        default:
          console.error('Đã xảy ra lỗi không xác định.');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;