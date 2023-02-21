import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetail: {},
  friendDetail: [],
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserDtl: (state, action) => {
      state.userDetail = action.payload.userDetail;
    },
    updateUserDtl: (state, action) => {
      console.log(action.payload)
      let indexOfElement = -1;
      state.userDetail.friends.forEach((item) => {
        if (item._id === action.payload._id || item._id === action.payload?.user?._id) {
          indexOfElement = state.userDetail.friends.indexOf(item);
        }
      });
      if (indexOfElement !== -1) {
        state.userDetail.friends.splice(indexOfElement, 1);
      } else {
        if (action.payload.user) {
          state.userDetail.friends.push(action.payload.user);
        } else {
          state.userDetail.friends.push(action.payload);
        }
      }
    },
    setFriends: (state, action) => {
      if (state.userDetail) {
        state.userDetail.friends = action.payload.friends;
      } else {
        console.error('user friends non-existent :(');
      }
    },
    resetUser: (state) => {
      state.userDetail = {};
      state.friendDetail = {};
    },
    setFriendDetaiil: (state, action) => {
      state.friendDetail = action.payload.friend;
    },
  },
});

export const { getUserDtl, setFriends, resetUser, updateUserDtl, setFriendDetaiil } = userSlice.actions;
export default userSlice.reducer;
