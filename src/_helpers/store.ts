import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../_reducers/index';

export const store = configureStore({
  reducer: rootReducer
});