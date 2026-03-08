import { createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../ComponentSupport/functions';

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    notifiIsland: "on",
    soundnotifiIsland: "on",
    notifiEmail: false
  },
  reducers: {
    updateSetting: (state, action) => {
        state.notifiIsland = action.payload.notifiIsland ?? state.notifiIsland,
        state.soundnotifiIsland = action.payload.soundnotifiIsland ?? state.soundnotifiIsland,
        state.notifiEmail = action.payload.notifiEmail ?? state.notifiEmail
    }
  }
});

export const { updateSetting } = settingSlice.actions;
export default settingSlice.reducer;