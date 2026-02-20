
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
