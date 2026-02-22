import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../const/const';

const axiosClient = axios.create({
  baseURL: `${API_URL}/api/client/`,
  headers: {
    'Content-Type': 'application/json',
    // 1. Thêm Custom Header để Server nhận diện request từ chính App của bạn
    'X-App-Source': 'almobe-react-client',
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 2. Chặn Request nếu phát hiện dev cố tình đổi baseURL lạ (phòng độc mã nguồn)
      if (!config.baseURL.includes('almobe.io.vn') && !config.baseURL.includes('192.168.')) {
          return Promise.reject(new Error('Cảnh báo: Yêu cầu kết nối đến nguồn không xác thực bị chặn!'));
      }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 3. Xử lý lỗi CSP hoặc mất mạng
    if (error.message === 'Network Error' && !error.response) {
       toast.error("Lỗi kết nối hoặc bị chính sách bảo mật (CSP) chặn!");
    }

    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || 'Đã xảy ra lỗi';
      
      localStorage.setItem('last-page_client', window.location.pathname);

      switch (status) {
        case 401:
          toast.error("Phiên đăng nhập hết hạn!");
          localStorage.multiRemove(['access_token', 'expires_in']); // Nếu dùng bộ nhớ chung
          break;
        case 403:
          toast.error("Bạn không có quyền truy cập vào tài nguyên này (Forbidden)!");
          break;
        case 422:
          // Lấy danh sách lỗi
          const validationErrors = data?.errors;

          // Kiểm tra nếu là mảng và có ít nhất 1 phần tử
          if (Array.isArray(validationErrors) && validationErrors.length > 0) {
            // Chỉ bắn thông báo cho lỗi đầu tiên
            toast.error(validationErrors[0]);
          } else if (typeof validationErrors === 'string') {
            // Trường hợp lỗi trả về là một chuỗi đơn thuần
            toast.error(validationErrors);
          } else {
            // Trường hợp mặc định nếu không lấy được mảng lỗi cụ thể
            toast.error(message || "Dữ liệu không hợp lệ.");
          }
          break;
        case 429:
          toast.error("Bạn đang thao tác quá nhanh. Vui lòng chậm lại!");
          break;
        case 500:
          toast.error('Lỗi hệ thống máy chủ!');
          break;
        default:
          toast.error(message);
      }
    } else {
      toast.error("Không thể kết nối đến máy chủ.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;