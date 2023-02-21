import { Box } from '@mui/system';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeePost } from '~/store/actions/postAction';

import CreatePost from '~/components/home/CreatePost';
import PostCard from '~/components/home/PostCard';
import StoryCarousel from '~/components/home/StoryCarousel';
import { useLocation } from 'react-router-dom';
  
const Content = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const feedPost = useSelector(state => state.post.feedPost)
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    dispatch(getFeePost(token))
  },[])

  return (
    <Box
      sx={{
        ml: {md: 8, lg: 0, xs: 0},
        mr: {lg: 4,},
        px: {xs: 0},
        width: {sm: "588px", xs: "100%"},
        height: 'auto',
      }}
    >
      <Box sx={{ my: 2, widht: '100%', height: '285px', position: 'relative', backgroundColor: 'background.main' }}>
        <StoryCarousel />
        <CreatePost />
        {feedPost.map((post,index) => (
          <PostCard key={post._id} postDetail={post} pathname={pathname}/>
        ))}
      </Box>  
    </Box>
  );
};

export default memo(Content);
