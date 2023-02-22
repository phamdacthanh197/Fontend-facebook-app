import { postDataAPI, getDataAPI } from "~/utils/fetchData" 
import { setAlert } from "../alertSlice";
import { getFile, makingFile, setAllStories, setEditPhotoOrVideo, setEditText, setFile, setText, updateStory } from "../storySlice";
import { createNotify } from "./notifyAction";


export const createTextStory =  ({story,socket,auth}) => async (dispatch) => {
  if(story.text === "Start typing" || story.text === "") return dispatch(setAlert({error: true}))
  try {
    const formData = new FormData()
    formData.append("background", story.className)
    formData.append("description", story.text)
    formData.append("source", " ")
    const res = await postDataAPI('stories', formData, auth.token );
    dispatch(setAlert({success: true}))
    dispatch(setText("Start typing"))

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
  if(story.file === null) return dispatch(setAlert({error: true}))
  try {
    const formData = new FormData()
    formData.append("source", story?.file)
    formData.append("background", "")
    formData.append("description", "")
    const res = await postDataAPI('stories', formData, auth.token );
    dispatch(updateStory({story: res.data.newStory}))
    dispatch(setAlert({success: true}))
    dispatch(getFile({file: null}))

    // todo notification
    const msg = {
      id: res.data.newStory._id,
      text: "Added a new story.",
      recipients: res.data.newStory.user.friends,
      url: `/stories/${res.data.newStory._id}`,
    };

    dispatch(createNotify({msg, auth, socket}));
  } catch(error) {
    console.log(error)
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