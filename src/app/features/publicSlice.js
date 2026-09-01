import { createSlice } from '@reduxjs/toolkit';

const publicSlice = createSlice({
  name: 'public',
  initialState: {
    check_server: false
  },
  reducers: {
    updatePublic: (state, action) => {
      // action.payload sẽ chứa dữ liệu mới bạn gửi lên
      state.check_server = action.payload.check_server;
    }
  }
});

export const { updatePublic } = publicSlice.actions;
export default publicSlice.reducer;