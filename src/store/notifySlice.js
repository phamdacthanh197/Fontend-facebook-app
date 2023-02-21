import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifies: [],
}

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotifies: (state, action) => {
      state.notifies = action.payload.notifies
    },
    resetNotify: (state) => {
      state.notifies = []
    },
    updateNotify: (state,action) => {
      state.notifies.unshift(action.payload.notify)
    }
  }
});

export const { setNotifies, resetNotify, updateNotify } =
  notifySlice.actions;
export default notifySlice.reducer;
