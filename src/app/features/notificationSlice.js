import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifi',
  initialState: {
    message: ""
  },
  reducers: {
    updateNotifi: (state, action) => {
        state.message = action.payload.message
    }
  }
});

export const { updateNotifi } = notificationSlice.actions;
export default notificationSlice.reducer;