import { setAlert } from "~/store/alertSlice";
import { createNewPost, getAllposts, getUerPost, setLikePost, updatePost, deletePst } from "~/store/postSlice"
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from "~/utils/fetchData" 
import { createNotify, removeNotify } from "./notifyAction";

export const getFeePost = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('posts', token);
    dispatch(getAllposts({feedPost: res.data}))
} catch (error) {
  dispatch(setAlert({error: true}))
}
}
  
export const getUserPost = (auth) => async (dispatch) => {
  try {
    const res = await getDataAPI(`user/posts`, auth.token);
    dispatch(getUerPost({userPost: res.data}))
  } catch (error) {
    dispatch(setAlert({error: true}))
  }
}

export const createPost =  ({file,textarea,token,user,handleCloseModal,socket,auth}) => async (dispatch) => {
  try {
    const formData = new FormData()
    formData.append("description", textarea)
    file && formData.append("source", file)
    const res = await postDataAPI('posts', formData, token );
    if (res) {
      handleCloseModal()
    }
    dispatch(createNewPost({newPost: {...res.data.newPost, user}}))
    dispatch(setAlert({success: true}))

    // todo notification
    const msg = {
      id: res.data.newPost._id,
      text: "Added a new post.",
      recipients: [...res.data.newPost.user.friends],
      content: textarea,
      url: `/posts/${res.data.newPost._id}`,
    };

    dispatch(createNotify({msg, auth, socket}));
  } catch(error) {
    dispatch(setAlert({error: true}))
  } 
}

export const likePost = ({ postDetail, auth, socket }) => async (dispatch) => {
  const feedPostIsliked = {...postDetail, likes: [...postDetail.likes, auth.user._id]}
  dispatch(updatePost({feedPost: feedPostIsliked}))
  if(postDetail.user._id === auth.user._id) {
    dispatch(updatePost({userPost: feedPostIsliked}))
  }
  dispatch(setLikePost())
  socket.emit("likePost", feedPostIsliked); 
  try {
    await patchDataAPI(`posts/${postDetail._id}/like`, null, auth.token);
       // todo notification
       const msg = {
        id: auth.user._id,
        text: "Liked your post.",
        recipients: [postDetail.user._id],
        url: `/posts/${postDetail._id}`,
        content: postDetail.content,
      };
  
      dispatch(createNotify({ msg, auth, socket }));
  } catch( error) {
    dispatch(setAlert({error: true}))
  }
}

export const unLikePost = ({ postDetail, auth, socket,notify }) => async (dispatch) => {
  const feedPostIsUnLike = {...postDetail, likes: postDetail.likes.filter((like) => like !== auth.user._id )}
  dispatch(updatePost({feedPost: feedPostIsUnLike}))
  if(postDetail.user._id === auth.user._id) {
    dispatch(updatePost({userPost: feedPostIsUnLike}))
  }
  dispatch(setLikePost())
  socket.emit("unLikePost", feedPostIsUnLike);
  try {
    await patchDataAPI(`posts/${postDetail._id}/unlike`, null, auth.token);
       // todo notification
       const msg = {
        id: auth.user._id,
        text: "Liked your post.",
        recipients: [postDetail.user._id],
        url: `/posts/${postDetail._id}`,
      };
  
      dispatch(removeNotify({ msg, auth, socket,notify }));
  } catch( error) {
    console.log(error)
    dispatch(setAlert({error: true}))
  }
}

export const deletePost = ({ postDetail, auth, socket,pathname }) => async (dispatch) => {
  if(pathname) {
    dispatch(deletePst({feedPost: postDetail}));
    return {}
  }
  dispatch(deletePst({userPost: postDetail}));
  
  try {
    const res = await deleteDataAPI(`posts/${postDetail._id}`, auth.token);
    dispatch(setAlert({success: true}))

    // todo notification
    const msg = {
      id: postDetail._id,
      text: "Added a new post.",
      recipients: res.data.newPost.user.friends,
      url: `/posts/${postDetail._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (error) {
    dispatch(setAlert({error: true}))
  }
};