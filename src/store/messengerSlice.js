import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  messages: [],
  conversations: [],
};

export const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !state.open
    },
    getMsg: (state, action) => {
      state.messages = action.payload.messages.reverse()
    },
    createMsg: (state, action) => {
      state.messages.push(action.payload.message)
    },
    getCon: (state, action) => {
      console.log(action.payload)
      state.conversations = action.payload.conversations.map((con,inde) => {
        const filterArray = con.recipients.filter(item => item._id !== action.payload.id)
        return {...con, recipients: filterArray}
      })
    },
    resetMessage : (state) => {
      state.messages = []
      state.conversations = []
    }
  },
});

export const { setOpen,getMsg, createMsg, getCon, resetMessage } =
  messengerSlice.actions;
export default messengerSlice.reducer;
