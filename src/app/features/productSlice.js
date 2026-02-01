import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // Mặc định là mảng rỗng ở đây
    loading: false,
    error: null,
  },
  reducers: {
    // Đây là hàm setProducts bạn cần
    setProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
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
export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;