import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const modalSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.open = !state.open
    },
  }
});

export const { setModalOpen } =
  modalSlice.actions;
export default modalSlice.reducer;
