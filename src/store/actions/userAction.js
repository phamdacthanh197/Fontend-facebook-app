import { setAlert } from '~/store/alertSlice';
import { getUserDtl, updateUserDtl } from '~/store/userSlice';
import { getDataAPI, patchDataAPI } from '~/utils/fetchData';
import { createNotify } from './notifyAction';

export const getUserDetail = (auth) => async (dispatch) => {
  try {
    const res = await getDataAPI('user', auth.token);
    dispatch(getUserDtl({ userDetail: res.data }));
  } catch (error) {
    dispatch(setAlert({ error: true }));
  }
};

export const addAndRemvoceFriends =
  ({ postDetail, auth, userDetail, socket }) =>
  async (dispatch) => {
    if (postDetail.user._id === auth.user._id) {
      return dispatch(setAlert({ error: true }));
    }
    const updateFriends = postDetail.user;
    dispatch(updateUserDtl(updateFriends));
    try {
      await patchDataAPI(`user/friends/${updateFriends._id}`, null, auth.token);
      dispatch(setAlert({ success: true }));
       
      socket.emit("toggleFriend", {updateFriends, user: auth.user} )
      // todo notification
      const msg = {
        id: auth.user._id,
        text: 'add friend width you',
        recipients: [postDetail.user._id],
        url: `/user/${auth.user._id}`,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch(setAlert({ error: true }));
    }
  };
