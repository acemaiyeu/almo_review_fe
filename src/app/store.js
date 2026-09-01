// store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profileSlice';
import productReducer from './features/productSlice';
import dynamicReducer from './features/dynamicIslandSlice';
import publicReducer from './features/publicSlice';


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    product: productReducer,
    dynamic: dynamicReducer,
    public: publicReducer
  },
});