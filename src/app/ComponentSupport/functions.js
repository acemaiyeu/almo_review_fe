
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