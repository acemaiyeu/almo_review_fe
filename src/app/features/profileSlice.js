import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    email: '',
    name: '',
    avatar: ''
  },
  reducers: {
    updateProfile: (state, action) => {
      console.log("ACTION: ", action)
      // action.payload sẽ chứa dữ liệu mới bạn gửi lên
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
    },
    resetProfile: (state) => {
      state.name = 'Chưa có tên';
      state.email = '';
    }
  }
});

export const { updateProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;