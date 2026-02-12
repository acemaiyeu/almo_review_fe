import { useDispatch } from "react-redux";
import { showDynamic } from "../app/ComponentSupport/functions";
import axiosAdmin from "./axiosAdmin";
import axiosClient from "./axiosClient";


export const getProductClientALl = async (params = [], page = 1, limit = 10) => {
    try {
        // Thêm return ở đầu dòng này
        params_text = "";
        if(params?.length > 0){

        }
        const res = await axiosClient.get(`products?${params_text}&page=${page}&limit=${limit}`);
        return res; // Trả về dữ liệu từ API
    } catch (error) {
        // console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        // throw error; 
    }
}
export const getProductALl = async (params = [], page = 1, limit = 10) => {
    try {
        // Thêm return ở đầu dòng này
        let params_text = "";
        if(params?.length > 0){

        }
        const res = await axiosAdmin.get(`products?${params_text}&page=${page}&limit=${limit}`);
        return res; // Trả về dữ liệu từ API
    } catch (error) {
        // console.error("Lỗi khi lấy sản phẩm:", error);
        // throw error; 
    }
}
export const getProductClientDetail = async (slug) => {
    try {
        // Thêm return ở đầu dòng này
        const res = await axiosClient.get(`product/${slug}`);
        return res.data; // Trả về dữ liệu từ API
    } catch (error) {
        // console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        // throw error; 
    }
}
export const createProduct = async (dispatch, params) => {
    try {
        // Thêm return ở đầu dòng này
        const res = await axiosAdmin.post(`product`, {
            ...params
        });
        showDynamic(dispatch, "Tạo sản phẩm thành công!")
        return res.data; // Trả về dữ liệu từ API
    } catch (error) {
        // console.error("Lỗi khi tạo sản phẩm:", error);
        // throw error; 
    }
}
export const updateProduct = async (dispatch, params) => {
    try {
        // Thêm return ở đầu dòng này
        const res = await axiosAdmin.put(`product/${params.id}`, {
            ...params
        });
        showDynamic(dispatch, "Cập nhật sản phẩm thành công!")
        return res.data; // Trả về dữ liệu từ API
    } catch (error) {
        // console.error("Lỗi khi cập nhật sản phẩm:", error);
        // throw error; 
    }
}
export const deleteProduct = async (dispatch, product_id) => {
    try {
        // Thêm return ở đầu dòng này
        const res = await axiosAdmin.delete(`product/${product_id}`).then(() => {
            showDynamic(dispatch, "Đã xóa sản phẩm thành công!")
        }).catch()
        return res; // Trả về dữ liệu từ API
    } catch (error) {
        // console.error("Lỗi khi xóa sản phẩm:", error);
        // throw error; 
    }
}
