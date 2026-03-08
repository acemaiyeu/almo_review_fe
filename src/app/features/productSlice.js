import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosClient from '../../services/axiosClient';
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // Mặc định là mảng rỗng ở đây
    loading: false,
    error: null,
    discount: 0
  },
  reducers: {
    // Đây là hàm setProducts bạn cần
    setProducts: (state, action) => {
      state.items = action.payload.data;
      state.loading = false;
      state.error = null;
      state.product_name = action.payload.product_name
    },
    // Bạn có thể thêm các hàm khác như clearProducts
    clearProducts: (state) => {
      state.items = [];
    }
  },
//   extraReducers: (builder) => {
//     // ... giữ nguyên phần fetchProducts.pending, fulfilled, rejected như cũ ...
//   },
});

// Đừng quên export action này ra để dùng
export const { setProducts, getDiscount, clearProducts } = productSlice.actions;
export default productSlice.reducer;