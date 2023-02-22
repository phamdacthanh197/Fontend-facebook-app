import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, Paper } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch, useSelector } from 'react-redux';

import FlexBetween from '../FlexBetween';
import Comment from './Comment';
import likeSvg from '~/assets/like.svg';
import { useState } from 'react';
import TimeAgo from '../TimeAgo';
import { likePost, unLikePost, deletePost } from '~/store/actions/postAction';
import CardMedia from '../story/CardMedia';
import { addAndRemvoceFriends } from '~/store/actions/userAction';
import { socketContext } from '~/SocketProvider';
import { domainName } from '~/utils/fetchData';

const PostCard = ({ postDetail, pathname }) => {
  console.log('PostCard');
  const [commentVisible, setCommentVisible] = useState(false);
  const islikePost = useSelector((state) => state.post.likePost);
  const userDetail = useSelector((state) => state.user.userDetail);
  const auth = useSelector((state) => state.auth);
  const socket = React.useContext(socketContext)
  const notify = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const handleLikeClick = () => {
    !islikePost && dispatch(likePost({ postDetail, auth, socket }));
    islikePost && dispatch(unLikePost({ postDetail, auth, socket, notify }));
  };
  return (
    <Paper elevation={2} sx={{ height: 'auto', width: '100%', p: 2, mb: 2 }}>
      <FlexBetween>
        <FlexBetween>
          <Avatar src={`${domainName}/assets/${postDetail.user.picturePath}`} />
          <Box ml={1}>
            <Typography fontWeight="500">{postDetail.user.firstName + ' ' + postDetail.user.lastName}</Typography>
            <FlexBetween gap={1}>
              <Typography variant="subtitle1">
                {postDetail.user.firstName + ' ' + postDetail.user.lastName}{' '}
                <TimeAgo timestamp={postDetail.updatedAt} />
              </Typography>
              <PublicIcon sx={{ fontSize: '15px' }} />
            </FlexBetween>
          </Box>
        </FlexBetween>
        <FlexBetween>
          <IconButton
            sx={{ color: 'red' }}
            onClick={() => dispatch(addAndRemvoceFriends({ userDetail, auth, postDetail,socket }))}
          >
            <PersonAddOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(deletePost({ postDetail, auth, socket, pathname }))}>
            <CloseIcon />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      <Box py={1}>{postDetail.description}</Box>
      <Box sx={{ width: '100%', height: '100%' }}>
        <CardMedia url={`${domainName}/assets/${postDetail.source}`} />
      </Box>
      <FlexBetween py={1}>
        <FlexBetween>
          <img style={{ height: '18px', width: '18px', marginRight: '8px' }} src={likeSvg} alt="like svg" />
          <Typography>{postDetail.likes.length}</Typography>
        </FlexBetween>
        <FlexBetween>
          <FlexBetween>
            <Typography mr={1}>{postDetail.comments.length}</Typography>
            <ChatBubbleOutlineIcon />
          </FlexBetween>
          <FlexBetween ml={1}>
            <Typography mr={1}>0</Typography>
            <ReplyIcon />
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      <Divider variant="middle" />
      <Box py={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleLikeClick} variant="string" size="large" sx={{ textTransform: 'none', flex: 1 }}>
          <ThumbUpOffAltIcon sx={{ fontSize: '18px', mr: 1 }} />
          <Typography sx={{ color: islikePost ? 'blue' : 'undefined' }}>Like</Typography>
        </Button>
        <Button
          onClick={() => setCommentVisible(!commentVisible)}
          variant="string"
          size="large"
          sx={{ textTransform: 'none', flex: 1 }}
        >
          <ChatBubbleOutlineIcon sx={{ fontSize: '18px', mr: 1 }} />
          <Typography>Comment</Typography>
        </Button>
        <Button variant="string" size="large" sx={{ textTransform: 'none', flex: 1 }}>
          <ReplyIcon sx={{ fontSize: '18px', mr: 1 }} />
          <Typography>Share</Typography>
        </Button>
      </Box>
      <Divider variant="middle" />
      {commentVisible && <Comment post={postDetail} />}
    </Paper>
  );
};

export default React.memo(PostCard);
