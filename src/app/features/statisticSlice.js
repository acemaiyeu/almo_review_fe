import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'statistic',
  initialState: {
    data: [],
    data_weekly: [0,0,0,0,0,0,0]
  },
  reducers: {
    updateStatistic: (state, action) => {
      // action.payload sẽ chứa dữ liệu mới bạn gửi lên
        state.data = action.payload.data,
        state.data_weekly = action.payload.data_weekly
    }
  }
});

export const { updateStatistic} = profileSlice.actions;
export default profileSlice.reducer;