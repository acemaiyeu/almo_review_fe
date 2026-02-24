// store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profileSlice';
import productReducer from './features/productSlice';
import dynamicReducer from './features/dynamicIslandSlice';
import statisticReeducer from './features/statisticSlice';


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    products: productReducer,
    dynamic: dynamicReducer,
    statistic: statisticReeducer
  },
});