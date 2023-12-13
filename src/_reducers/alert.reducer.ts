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
    alertSuccess: (state, action: PayloadAction<string>) => {
      state.type = 'alert-success';
      state.message = action.payload;
    },
    alertError: (state, action: PayloadAction<string>) => {
      state.type = 'alert-danger';
      state.message = action.payload;
    },
    alertClear: (state) => {
      state.type = undefined;
      state.message = undefined;
    },
  },
});

export const { alertSuccess: alertSuccess, alertError, alertClear } = alertSlice.actions;

export default alertSlice.reducer;