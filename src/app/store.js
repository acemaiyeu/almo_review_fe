// store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profileSlice';
import productReducer from './features/productSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    product: productReducer,
  },
});