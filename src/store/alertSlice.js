import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
