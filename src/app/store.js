// store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profileSlice';
import productReducer from './features/productSlice';
import dynamicReducer from './features/dynamicIslandSlice';
import statisticReducer from './features/statisticSlice';
import notifiReducer from './features/notificationSlice';

const isAdminPage = location.pathname.startsWith('/admin');
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    products: productReducer,
    dynamic: dynamicReducer,
    statistic: statisticReducer,
    notifi: notifiReducer
  },
  devTools: !isAdminPage
});