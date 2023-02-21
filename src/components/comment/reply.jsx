import { Avatar, Box, InputBase, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';

import { createComment, createReplyComment, deleteReplyOfComment, updateReplyComment } from '~/store/actions/commentAction';
import FlexBetween from '../FlexBetween';
import TimeAgo from '../TimeAgo';
import { URL } from '~/utils/fetchData';



const Reply = ({ comment, postId }) => {
  console.log ("reply")
  const [id, setId] = useState("")
  const comments = useSelector((state) => state.comment.comments);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const typogaphyRef = useRef([])
  const [description, setDescription] = useState('');
  const { auth, socket } = useSelector((state) => state);
  const handleChange = (e) => {
    setDescription(e.target.value)
  }
  const handleEdit = (id) => {
    const el = typogaphyRef.current.filter(el => el.id == id)
    setDescription(el[0].innerText)
    window.location.href = `#input${comment._id}`;
    setId(id)
  }
  const handleDelete = (id) => {
    dispatch(deleteReplyOfComment({id,auth,comment,socket}))
  }
  const handleKeydown = (e) => {
    const key = e.key;
    if (key === 'Enter') {
      if(window.location.hash) {
        dispatch(updateReplyComment({auth, description,id,comment }))
        setDescription("")
        navigate("/home")
      } else {
      dispatch(createReplyComment({ postId, auth, description, socket, comment }));
      setDescription('');
    }
  };}

  return (
    <Box sx={{ width: 'auto', ml: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {comments.filter(item => item._id == comment._id)[0]?.reply?.map((comment, index) => (
        <Box key={comment._id + index} sx={{ display: 'flex', mt: 1 }}>
          <Avatar
            src={`${URL}/assets/${comment?.user?.picturePath}`}
            sx={{ height: '32px', width: '32px' }}
          />
          <Box ml={1}>
            <Box
              sx={{
                padding: '8px 12px',
                borderRadius: '15px',
                backgroundColor: 'background.submain',
              }}
            >
              <FlexBetween>
                <Typography variant="subtitle2">{comment?.user?.firstName + ' ' + comment?.user?.lastName}</Typography>
                <Box>
                  <BorderColorIcon
                    onClick={() => handleEdit(comment._id)}
                    sx={{
                      cursor: 'pointer',
                      mr: '4px',
                      display: auth.user._id === comment.user._id ? 'inline-block' : 'none',
                    }}
                  />
                  <CloseIcon
                    onClick={() =>handleDelete(comment._id)}
                    sx={{ cursor: 'pointer', display: auth.user._id === comment.user._id ? 'inline-block' : 'none' }}
                  />
                </Box>
              </FlexBetween>
              <Typography id={comment._id} ref={(el) => (typogaphyRef.current[index] = el)}>
                {comment?.description}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, px: 1 }}>
              <Typography variant="subtitle2">{/* {comment?.likes?.length} Like */} like</Typography>
              <Typography variant="subtitle2" onClick={() => {}} sx={{ cursor: 'pointer' }}>
                {/* {comment?.reply?.length} Reply */} reply
              </Typography>
              <Typography variant="subtitle2">Share</Typography>
              <TimeAgo timestamp={comment?.updatedAt} />
            </Box>
          </Box>
        </Box>
      ))}
      <FlexBetween sx={{ width: '100%' }}>
        <Avatar src={`${URL}/assets/${auth.user.picturePath}`} sx={{ height: '32px', width: '32px' }} />
        <InputBase
          // autoFocus={true}
          id={`input${comment._id}`}
          value={description}
          onChange={handleChange}
          onKeyDown={handleKeydown}
          placeholder="Write a publlic comment..."
          sx={{
            py: 1,
            px: 2,
            ml: 1,
            height: '32px',
            width: '100%',
            borderRadius: '999px',
            backgroundColor: 'background.submain',
          }}
        />
      </FlexBetween>
    </Box>
  );
};

export default React.memo(Reply);
