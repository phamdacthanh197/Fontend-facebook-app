import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedPost: [],
  userPost: [],
  likePost: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createNewPost: (state, action) => {
      state.feedPost = [action.payload.newPost, ...state.feedPost];
      state.userPost = [action.payload.newPost, ...state.userPost];
    },
    getAllposts: (state, action) => {
      state.feedPost = action.payload.feedPost;
    },
    getUerPost: (state, action) => {
      state.userPost = action.payload.userPost;
    },
    setLikePost: (state) => {
      state.likePost = !state.likePost;
    },
    updatePost: (state, action) => {
      if (action.payload.userPost) {
        state.userPost = state.userPost.map((userPost) => {
          if (userPost._id === action.payload.userPost._id) {
            return action.payload.userPost;
          }
          return userPost;
        });
      }
      if (action.payload.feedPost) {
        state.feedPost = state.feedPost.map((feedPost) => {
          if (feedPost._id === action.payload.feedPost._id) {
            return action.payload.feedPost;
          }
          return feedPost;
        });
      }},
    deletePst: (state, action) => {
      if(action.payload.feedPost){
        const deletePost = state.feedPost.filter((feedPost) => feedPost._id !== action.payload.feedPost._id);
        state.feedPost = deletePost;
      } else {
        const deletePost = state.userPost.filter((userPost) => userPost._id !== action.payload.userPost._id);
        state.userPost = deletePost;
      }
    },
    resetPost: (state) => {
      state.feedPost = [];
      state.userPost = [];
      state.likePost = false
    }
  }
});

export const { createNewPost, getAllposts, getUerPost, setLikePost, updatePost, deletePst,resetPost } = postSlice.actions;
export default postSlice.reducer;
