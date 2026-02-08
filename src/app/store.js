// store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profileSlice';
import productReducer from './features/productSlice';
import dynamicReducer from './features/dynamicIslandSlice';


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    product: productReducer,
    dynamic: dynamicReducer
  },
});