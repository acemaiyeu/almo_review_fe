
import axiosAdmin from "../../services/axiosAdmin";
import { updateDynamic } from "../features/dynamicIslandSlice"

export const showDynamic = (dispatch, content) => {
    dispatch(updateDynamic({ title: "", content }));
};
export const uploadImage = async (dispatch, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // 'thumbnail' là key sẽ nhận bên Laravel
    formData.append('name', 'Redmi Turbo 4 Pro'); // Gửi kèm các field khác nếu cần

    try {
        const response = await axiosAdmin.post('upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
            showDynamic(dispatch, "Upload thành công!");
        return response.data;
    } catch (error) {
        console.error('Lỗi upload:', error);
    }
}

// Hàm tạo/cập nhật cookie
export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Hàm lấy giá trị cookie
export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export const deleteCookie = (cname) => {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export const formatToNumber = (str) => {
    // 1. Kiểm tra nếu đầu vào không có giá trị
    if (!str && str !== 0) return 0;

    // 2. Chuyển sang chuỗi (phòng trường hợp đầu vào đã là số)
    const stringValue = String(str);

    // 3. Loại bỏ tất cả ký tự không phải số bằng Regex \D
    const number = stringValue.replace(/\D/g, "");

    // 4. Trả về số nguyên, mặc định là 0 nếu chuỗi rỗng
    return parseInt(number, 10) || 0;
};
export const formatToCurrency = (num) => {
    // 1. Kiểm tra nếu không phải số hoặc là chuỗi rỗng thì trả về mặc định
    if (num === null || num === undefined || isNaN(num)) {
        return "0 ₫";
    }

    // 2. Chuyển đổi num sang dạng số (phòng trường hợp truyền vào chuỗi "1000")
    const amount = Number(num);

    // 3. Định dạng theo chuẩn vi-VN
    return amount.toLocaleString('vi-VN') + " ₫";
};
import { useState, useEffect } from 'react';

export function useIp() {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        // Sử dụng ipify (hoặc icanhazip.com)
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Không thể lấy IP:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIp();
  }, []);

  return { ip, loading };
}