import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '~/utils/fetchData';
import { setAlert } from '../alertSlice';
import { setComment, updateCmt, updateReply } from '../commetSlice';
import { updatePost } from '../postSlice';
import { createNotify, removeNotify } from './notifyAction';

export const getCommentOfPost =
  ({ post, auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`comments/${post._id}`, auth.token);
      dispatch(setComment({ comment: res.data.newComment }));
    } catch (error) {
      dispatch(setAlert({ error: true }));
    }
  };
export const createComment =
  ({ post, description, auth, socket }) =>
  async (dispatch) => {
    try {
      const data = {
        description: description,
        postId: post._id,
      };
      const res = await postDataAPI('comments', data, auth.token);

      const newData = { ...res.data.newComment };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch(updatePost({ feedPost: newPost }));
      dispatch(updatePost({ userPost: newPost }));
      // todo socket
      socket.emit('createComment', newPost);

      // todo notification
      const msg = {
        id: res.data.newComment._id,
        text: 'commented on your post.',
        recipients: [post.user._id],
        url: `/posts/${post._id}`,
        content: description,
      };

      if(auth.user._id !== post.user._id){dispatch(createNotify({ msg, auth, socket }));}
    } catch (err) {
      dispatch(setAlert({ error: true }));
    }
  };

export const createReplyComment =
  ({ postId, description, auth, socket, comment }) =>
  async (dispatch) => {
    try {
      const data = {
        description: description,
        postId,
        reply: comment._id,
      };
      const res = await postDataAPI('comments', data, auth.token);
      const newData = { ...res.data.newComment };
      // const newReplyComment = { ...comment, comments: [...post.comments, newData] };
      dispatch(updateCmt({ comment: newData, commentId: comment._id }));

      // todo notification
      const msg = {
        id: res.data.newComment._id,
        text: 'reply on your comment.',
        recipients: [comment.user._id],
        url: `/comments/${comment._id}`,
        content: description,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch(setAlert({ error: true }));
    }
  };

export const updateComment =
  ({ description, post, auth, id }) =>
  async (dispatch) => {
    const newComments = post.comments.map((item) => {
      if (item._id == id) {
        return { ...item, description: description };
      } else {
        return item;
      }
    });
    const newPost = { ...post, comments: newComments };
    dispatch(updatePost({ feedPost: newPost }));
    dispatch(updatePost({ userPost: newPost }));
    try {
      await patchDataAPI(`comments/${id}`, { description }, auth.token);
    } catch (err) {
      dispatch(setAlert({ error: true }));
    }
  };

export const updateReplyComment =
  ({ description, auth, id, comment }) =>
  async (dispatch) => {
    try {
      const res = await patchDataAPI(`comments/${id}`, { description }, auth.token);
      dispatch(updateReply({ comment: res.data.newComment, commentId: comment._id }));
    } catch (err) {
      dispatch(setAlert({ error: true }));
    }
  };

export const deleteComment =
  ({ post, id, auth, socket }) =>
  async (dispatch) => {
    // const deleteArr = [...post.comments.filter((cm) => cm.reply === id)];

    const newPost = {
      ...post,
      comments: post.comments.filter((cm) => cm._id !== id),
    };
    dispatch(updatePost({ feedPost: newPost }));
    dispatch(updatePost({ userPost: newPost }));

    socket.emit('deleteComment', newPost);

    try {
      await deleteDataAPI(`comments/${id}`, auth.token);

      // todo notification
      const msg = {
        id,
        text: 'commented on your post.',
        recipients: [post.user._id],
        url: `/posts/${post._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch(setAlert({ error: true }));
    }
  };
export const deleteReplyOfComment =
  ({ id, auth, socket, comment }) =>
  async (dispatch) => {
    dispatch(updateReply({ comment: { _id: id, isReply: true }, commentId: comment._id }));
    try {
      await deleteDataAPI(`comments/${comment._id}/${id}`, auth.token);
      const msg = {
        id,
        text: 'reply on your comment.',
        recipients: [comment.user._id],
        url: `/comments/${comment._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch(setAlert({ error: true }));
    }
  };
