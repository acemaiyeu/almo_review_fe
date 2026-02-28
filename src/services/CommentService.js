import { showDynamic } from "../app/ComponentSupport/functions";
import axiosClient from "./axiosClient";

// Service cho Comment
export const getCommentsByProduct = async (productId, page = 1) => {
    try {
        const res = await axiosClient.get(`products/${productId}/comments?page=${page}`);
        return res; // Trả về data từ Transformer
    } catch (error) {
        console.error("Lỗi lấy bình luận:", error);
    }
}

export const postComment = async (dispatch, params) => {
    try {
        const res = await axiosClient.post(`comments`, params);
        showDynamic(dispatch, "Gửi bình luận thành công!");
        return res.data;
    } catch (error) {
        showDynamic(dispatch, "Lỗi khi gửi bình luận!");
    }
}