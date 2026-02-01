import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: 'Chưa có tên',
    email: ''
  },
  reducers: {
    updateProfile: (state, action) => {
      // action.payload sẽ chứa dữ liệu mới bạn gửi lên
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    resetProfile: (state) => {
      state.name = 'Chưa có tên';
      state.email = '';
    }
  }
});

export const { updateProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;