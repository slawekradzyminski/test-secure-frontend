import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlertMessage = string;

const alertSlice = createSlice({
  name: 'alert',
  initialState: '',
  reducers: {
    success: (_, action: PayloadAction<AlertMessage>) => action.payload,
    error: (_, action: PayloadAction<AlertMessage>) => action.payload,
    clear: () => '',
  },
});

export const { success, error, clear } = alertSlice.actions;

export default alertSlice;