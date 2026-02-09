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
      // action.payload sẽ chứa dữ liệu mới bạn gửi lên
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
    },
    resetProfile: (state) => {
       state.name = undefined;
      state.email = '';
      state.avatar = '';
    }
  }
});

export const { updateProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;