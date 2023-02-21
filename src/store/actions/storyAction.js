import { postDataAPI, getDataAPI } from "~/utils/fetchData" 
import { setAlert } from "../alertSlice";
import { setAllStories } from "../storySlice";
import { createNotify } from "./notifyAction";


export const createTextStory =  ({story,socket,auth}) => async (dispatch) => {
  try {
    const formData = new FormData()
    formData.append("background", story.className)
    formData.append("description", story.text)
    formData.append("source", " ")
    const res = await postDataAPI('stories', formData, auth.token );

    dispatch(setAlert({success: true}))

    // todo notification
    const msg = {
      id: res.data.newStory._id,
      text: "Added a new story.",
      recipients: res.data.newStory.user.friends,
      content: story.text,
      url: `/stories/${res.data.newStory._id}`,
    };

    dispatch(createNotify({msg, auth, socket}));
  } catch(error) {
    dispatch(setAlert({error: true}))
  } 
}
export const createVideoStory =  ({story,socket,auth}) => async (dispatch) => {
  try {
    const formData = new FormData()
    formData.append("source", story?.file)
    formData.append("background", "")
    formData.append("description", "")
    const res = await postDataAPI('stories', formData, auth.token );

    dispatch(setAlert({success: true}))

    // todo notification
    const msg = {
      id: res.data.newStory._id,
      text: "Added a new story.",
      recipients: res.data.newStory.user.friends,
      url: `/stories/${res.data.newStory._id}`,
    };

    dispatch(createNotify({msg, auth, socket}));
  } catch(error) {
    dispatch(setAlert({error: true}))
  } 
}
export const getAllStories =  (auth) => async (dispatch) => {
  try {
    const res = await getDataAPI('stories',auth.token)
    dispatch(setAllStories({stories: res.data}))
  } catch(error) {
    dispatch(setAlert({error: true}))
  } 
}