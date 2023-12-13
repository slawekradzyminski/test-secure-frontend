import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertState = {
  type?: 'alert-success' | 'alert-danger';
  message?: string;
};

const initialState: AlertState = {};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    success: (state, action: PayloadAction<string>) => {
      state.type = 'alert-success';
      state.message = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.type = 'alert-danger';
      state.message = action.payload;
    },
    clear: (state) => {
      state.type = undefined;
      state.message = undefined;
    },
  },
});

export const { success, error, clear } = alertSlice.actions;

export default alertSlice.reducer;