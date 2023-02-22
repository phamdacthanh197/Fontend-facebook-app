import { Avatar, Box, InputBase, Typography } from '@mui/material';
import React, {useContext, useEffect, useRef, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { createComment, updateComment,getCommentOfPost, deleteComment } from '~/store/actions/commentAction';
import FlexBetween from '../FlexBetween';
import TimeAgo from '../TimeAgo';
import { useNavigate } from 'react-router-dom';
import Reply from '../comment/reply';
import { socketContext } from '~/SocketProvider';
import { domainName } from '~/utils/fetchData';

const Comment = ({ post }) => {
  console.log("comment")
  const [commentId, setCommentId] = useState("")
  const [id, setId] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const typogaphyRef = useRef([])
  const socket = useContext(socketContext)
  const [description, setDescription] = useState("")
  const {
    auth
  } = useSelector((state) => state);
  const handleChange = (e) => {
    setDescription(e.target.value)
  }
  const handleEdit = (id) => {
    const el = typogaphyRef.current.filter(el => el.id == id)
    setDescription(el[0].innerText)
    window.location.href = `#input${post._id}`;
    setId(id)
  }
  const handleReply = (id) => {
    id === commentId && setCommentId("")
    !(id === commentId) && setCommentId(id)
  }
  const handleDelete = (id) => {
    dispatch(deleteComment({ post, auth, id, socket}))
  }

  const handleKeydown = (e) => {
    const key = e.key
    if(key === "Enter") {
      if(window.location.hash) {
        dispatch(updateComment({ post, auth, description,id}))
        setDescription("")
        navigate("/home")
      } else {
        dispatch(createComment({ post, auth, description, socket}))
        setDescription("")
      }
    }
  }
  useEffect(() => {
    dispatch(getCommentOfPost({post,auth}))
  },[post,dispatch])
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Typography>Top comments</Typography>
        <ArrowDropDownIcon />
      </Box>
      <FlexBetween>
        <Avatar src={`${domainName}/assets/${auth.user.picturePath}`} sx={{ height: '32px', width: '32px' }} />
        <InputBase
          autoFocus={true}
          id={`input${post._id}`}
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
      {post?.comments.map((comment,index) => (
        <Box key={comment._id} sx={{ display: 'flex',flexDirection: "column", mt: 1 }}>
          <Box sx={{ display: "flex"}}>
            <Avatar src={`${domainName}/assets/${comment?.user?.picturePath}`} sx={{ height: '32px', width: '32px' }} />
            <Box ml={1}>
              <Box
                sx={{
                  padding: '8px 12px',
                  borderRadius: '15px',
                  backgroundColor: 'background.submain',
                }}
              >
                <FlexBetween>
                  <Typography variant="subtitle2">{comment?.user?.firstName + " " + comment?.user?.lastName}</Typography>
                  <Box> 
                    <BorderColorIcon onClick={() => handleEdit(comment._id)} sx={{ cursor: "pointer", mr: "4px", display: auth.user._id === comment.user._id ? "inline-block" : "none" }}/>
                    <CloseIcon onClick={() =>handleDelete(comment._id)} sx={{ cursor: "pointer", display: auth.user._id === comment.user._id ? "inline-block" : "none"}}/>
                  </Box>
                </FlexBetween>
                <Typography id={comment._id} ref={(el) => typogaphyRef.current[index] = el} >{comment?.description}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", gap: 2, px: 1 }}>
                <Typography variant="subtitle2">Like</Typography>
                <Typography variant="subtitle2" onClick={() => handleReply(comment._id)} sx={{ cursor: "pointer"}}>{comment?.reply?.length} Reply</Typography>
                <Typography variant="subtitle2">Share</Typography>
                <TimeAgo timestamp={comment?.updatedAt}/>
                
              </Box>
            </Box>
          </Box> 
         {comment._id === commentId && <Reply comment={comment} postId={post._id}/>}
        </Box>
      ))}
    </Box>
  );
};

export default Comment;
