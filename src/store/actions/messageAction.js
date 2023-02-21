import { getDataAPI, postDataAPI } from '~/utils/fetchData';
import { setAlert } from '../alertSlice';
import { createMsg, getCon, getMsg, setOpen } from '../messengerSlice';
import { setFriendDetaiil } from '../userSlice';


export const getChatBox =
  ({ auth, friend, flex = false }) =>
  async (dispatch) => {
    try {
      if (flex) {
        dispatch(setFriendDetaiil({ friend: friend }));
      } else {
        dispatch(setOpen());
        dispatch(setFriendDetaiil({ friend: friend }));
      }
      const res = await getDataAPI(`messages/${friend._id}`, auth.token);
      dispatch(getMsg({ messages: res.data.messages }));
    } catch (error) {
      dispatch(setAlert({ error: true }));
    }
  };
export const getConversation =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`conversations`, auth.token);
      dispatch(getCon({ conversations: res.data.conversations, id: auth.user._id }));
    } catch (error) {
      dispatch(setAlert({ error: true }));
    }
  };

export const createMessage =
  ({ text, auth, friend, socket }) =>
  async (dispatch) => {
    const data = {
      recipient: friend._id,
      text,
    };

    try {
      const res = await postDataAPI(`messages`, data, auth.token);
      dispatch(createMsg({ message: res.data.newMessage }));
      socket.emit('addMessage', res.data.newMessage);
    } catch (error) {
      dispatch(setAlert({ error: true }));
    }
  };
