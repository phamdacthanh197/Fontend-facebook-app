import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    updateCmt: (state, action) => {
      const updateComment = state.comments.map((item) => {
        if (item._id == action.payload.commentId) {
          item.reply.push(action.payload.comment);
          return item;
        } else {
          return item;
        }
      });

      state.comments = updateComment;
    },
    updateReply: (state, action) => {
      const updateComment = state.comments.map((item) => {
        if (item._id === action.payload.commentId) {
          let index = item.reply.indexOf(item.reply.find((item) => item == action.payload.comment._id));
          console.log('here');
          action.payload.comment.isReply
            ? item.reply.splice(index, 1)
            : item.reply.splice(index, 1, action.payload.comment);
          return item;
        } else {
          return item;
        }
      });

      state.comments = updateComment;
    },
    setComment: (state, action) => {
      state.comments = action.payload.comment;
    },
    resetComment: (state) => {
      state.comments = [];
    },
  },
});

export const { updateCmt, setComment, resetComment, updateReply } = commentSlice.actions;
export default commentSlice.reducer;
