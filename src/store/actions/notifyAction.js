import { setAlert } from "~/store/alertSlice";
import { setNotifies, updateNotify } from "~/store/notifySlice";
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from "~/utils/fetchData" 

export const createNotify = ({msg, auth, socket }) => async (dispatch) => {

  try {
      const res = await postDataAPI(`notifies`, msg, auth.token);
      console.log(res.data.notify)
      // dispatch(updateNotify({notify: res.data.notify}))

      socket.emit('createNotify', {
        ...res.data.notify,
        userInform: {
          username: auth.user.firstName + " " + auth.user.lastName,
          avatar: auth.user.picturePath,
        }
      });
  } catch (error) {
    console.log(error)
    dispatch(setAlert({error: true}))
  }
};

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {

  try {
    await deleteDataAPI(`notifies/${msg.id}?url=${msg.url}`, auth.token);
    socket.emit("removeNotify", msg);
  } catch (error) {
    dispatch(setAlert({error: true}))
  }
};

export const getNotifies = ({auth}) => async (dispatch) => {
  try {
    const res = await getDataAPI('user/notifies', auth.token);
    dispatch(setNotifies({notifies: res.data.notifies}))
  } catch (err) {
    dispatch(setAlert({error: true}))
  }
};




