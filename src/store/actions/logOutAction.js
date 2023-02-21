import { setAlert } from "../alertSlice"
import { restAuth } from "../authSlice"
import { resetComment } from "../commetSlice"
import { resetMessage } from "../messengerSlice"
import { resetNotify } from "../notifySlice"
import { resetPost } from "../postSlice"
import { resetStory } from "../storySlice"
import { resetUser } from "../userSlice"

export const logout = () => async (dispatch) => {
  try{
    dispatch(resetPost())
    dispatch(restAuth())
    dispatch(resetUser())
    dispatch(resetComment())
    dispatch(resetStory())
    dispatch(resetNotify())
    dispatch(resetMessage())
    dispatch(setAlert({}))
  } catch (error) {
    dispatch(setAlert({error: true}))
  }
}