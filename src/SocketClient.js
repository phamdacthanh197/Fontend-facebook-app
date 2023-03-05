import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import audioTone from './audio/pristine-609.mp3';
import { socketContext } from './SocketProvider';
import { createMsg } from './store/messengerSlice';
import { updateNotify } from './store/notifySlice';
import { updatePost } from './store/postSlice';
import { updateUserDtl } from './store/userSlice';

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);
  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, '_blank');
  };
};

const SocketClient = () => {
  const socket = useContext(socketContext);
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const audioRef = useRef();

  //!connection
  useEffect(() => {
    socket.emit('joinUser', auth?.user?._id);
    // console.log('emit from Client', auth?.user?._id);
  }, [socket, auth]);

  // !like Post
  useEffect(() => {
    socket.on('likeToClient', (newPost) => {
      // console.log(newPost);
      dispatch(updatePost({ feedPost: newPost }));
      dispatch(updatePost({ userPost: newPost }));
    });
    return () => socket.off('likeToClient');
  }, [socket, dispatch]);

  //!Unlike Post
  useEffect(() => {
    socket.on('unLikeToClient', (newPost) => {
      // console.log(newPost);
      dispatch(updatePost({ feedPost: newPost }));
      dispatch(updatePost({ userPost: newPost }));
    });
    return () => socket.off('unLikeToClient');
  }, [socket, dispatch]);

  //!Comments
  useEffect(() => {
    socket.on('createCommentToClient', (newPost) => {
      dispatch(updatePost({ feedPost: newPost }));
      dispatch(updatePost({ userPost: newPost }));
      // console.log(newPost);
    });
    return () => socket.off('createCommentToClient');
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('deleteCommentToClient', (newPost) => {
      dispatch(updatePost({ feedPost: newPost }));
      dispatch(updatePost({ userPost: newPost }));
    });
    return () => socket.off('deleteCommentToClient');
  }, [socket, dispatch]);

  //add friend
  useEffect(() => {
    socket.on('toggleFriendForClient', (newUser) => {
      // console.log(newUser);
      dispatch(updateUserDtl({ ...newUser.updateFriends, user: newUser.user }));
    });
    return () => socket.off('toggleFriendForClient');
  }, [socket, dispatch, auth]);

  // !Notifications
  useEffect(() => {
    socket.on('createNotifyToClient', (msg) => {
      // console.log(msg)
      dispatch(updateNotify({ notify: msg }));
      audioRef.current.play();
      spawnNotification(msg.userInform.username + ' ' + msg.text, msg.userInform.avatar, msg.url, 'FACEBOOK CONNECT');
    });
    return () => socket.off('createNotifyToClient');
  }, [socket, dispatch]);

  // !Messages
  useEffect(() => {
    socket.on('addMessageToClient', (msg) => {
      // console.log(msg);
      audioRef.current.play();
      dispatch(createMsg({ message: msg }));
    });
    return () => socket.off('addMessageToClient');
  }, [socket, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: 'none' }}>
        <source src={audioTone} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
