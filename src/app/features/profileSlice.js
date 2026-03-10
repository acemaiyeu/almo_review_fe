import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    id: undefined,
    email: '',
    name: '',
    avatar: '',
    notification: false,
    role_code: 'GUEST',
    reason_block: "2"
  },
  reducers: {
    updateProfile: (state, action) => {
      // action.payload sẽ chứa dữ liệu mới bạn gửi lên
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.notification = action.payload.notification_email,
      state.role_code = action.payload.role_code,
      state.reason_block = action.payload.reason_block
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