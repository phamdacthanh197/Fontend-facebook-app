import React, { useEffect } from 'react';
import { Box, Typography, InputBase, IconButton, Avatar, Paper, Button } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useNavigate } from 'react-router-dom';

import FlexBetween from '~/components/FlexBetween';
import TimeAgo from './TimeAgo';
import { useDispatch, useSelector } from 'react-redux';
import { getChatBox, getConversation } from '~/store/actions/messageAction';
import { domainName } from '~/utils/fetchData';

const ChatList = ({ flex, handleClloseMessenger }) => {
  const auth = useSelector((state) => state.auth);
  const conversations = useSelector((state) => state.messenger.conversations);
  // console.log(conversations);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (friend) => {
    dispatch(getChatBox({friend,auth,flex}))
  } 
  useEffect(() => {
    dispatch(getConversation({ auth }));
  }, []);
  return (
    <>
      {!flex && (
        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'background.main',
            height: { lg: '650px', xs: '450px' },
            width: '360px',
          }}
        >
          <FlexBetween px={2} py={'12px'} sx={{ width: '100%', height: '48px' }}>
            <Typography variant="h4" fontWeight="bold">
              Chats
            </Typography>
            <FlexBetween gap={1}>
              <LinearScaleIcon sx={{ fontSize: '20px' }} />
              <ZoomOutMapIcon sx={{ fontSize: '20px' }} />
              <VideoCallIcon sx={{ fontSize: '30px' }} />
              <BorderColorIcon sx={{ fontSize: '20px' }} />
            </FlexBetween>
          </FlexBetween>
          <Box px={2} mb={2}>
            <Box
              sx={{
                backgroundColor: 'background.submain',
                borderRadius: '999px',
                height: '40px',
                width: '100%',
              }}
            >
              <IconButton sx={{ backgroundColor: 'background.submain', height: '39px', width: '40px' }}>
                <SearchOutlined />
              </IconButton>
              <InputBase
                placeholder="Search Facebook"
                sx={{
                  pl: '2px',
                  borderRadius: '999px',
                  height: '40px',
                  width: '132px',
                }}
              />
            </Box>
          </Box>
          <Box pl={2}>
            <Button variant="outlined">InBox</Button>
            <Button variant="string">Comunities</Button>
          </Box>
          <Box p={2} py={2} sx={{ display: 'flex', flexDirection: 'column', height: '100vh', gap: 1 }}>
            {conversations?.map((conversation, index) => (
              <Box key={conversation?._id + index + Math.random()} onClick={() => handleClick(conversation?.recipients[0])} sx={{ display: 'flex', gap: 1, cursor: "pointer" }}>
                <Avatar
                  src={`${domainName}/assets/${conversation?.recipients[0]?.picturePath}`}
                  sx={{ height: '56px', width: '56px' }}
                />
                <Box pl={2}>
                  <Typography>
                    <b>{conversation?.recipients[0]?.firstName + ' ' + conversation?.recipients[0]?.lastName}</b>{' '}
                    {conversation?.text}
                  </Typography>
                  <TimeAgo timestamp={conversation?.createdAt} />
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              borderTop: '1px solid grey',
              height: '44px',
              width: '100%',
              position: 'sticky',
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => {
                navigate('/messenger');
                handleClloseMessenger();
              }}
              fullWidth
              color="primary"
              fontWeight={500}
              sx={{
                textTransform: 'none',
                cursor: 'pointer',
              }}
            >
              See all in Messenger{' '}
            </Button>
          </Box>
        </Box>
      )}

      {flex && (
        <Paper
          elevation={3}
          sx={{
            flex: { xs: 'none', md: flex },
            position: 'relative',
            backgroundColor: 'background.main',
            width: { xs: '80px', md: 'clamp(200px, 300px, 360px)' },
          }}
        >
          <FlexBetween px={2} py={'12px'} sx={{ display: { xs: 'none', md: 'flex' }, width: '100%', height: '48px' }}>
            <Typography variant="h4" fontWeight="bold">
              Chats
            </Typography>
            <FlexBetween gap={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <LinearScaleIcon sx={{ fontSize: '20px' }} />
              <ZoomOutMapIcon sx={{ fontSize: '20px' }} />
              <VideoCallIcon sx={{ fontSize: '30px' }} />
              <BorderColorIcon sx={{ fontSize: '20px' }} />
            </FlexBetween>
          </FlexBetween>
          <Box px={2} mb={2}>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                backgroundColor: 'background.submain',
                borderRadius: '999px',
                height: '40px',
                width: '100%',
              }}
            >
              <IconButton sx={{ backgroundColor: 'background.submain', height: '39px', width: '40px' }}>
                <SearchOutlined />
              </IconButton>
              <InputBase
                placeholder="Search Facebook"
                sx={{
                  pl: '2px',
                  borderRadius: '999px',
                  height: '40px',
                  width: '132px',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="outlined">InBox</Button>
            <Button variant="contained" sx={{ display: { xs: 'none', md: 'block' } }}>
              Comunities
            </Button>
          </Box>
          
          <Box p={2} py={2} sx={{ display: 'flex', flexDirection: 'column', height: '100vh', gap: 1 }}>
            {conversations?.map((conversation, index) => (
              <Box key={conversation?._id + index + Math.random()} onClick={() => handleClick(conversation?.recipients[0])} sx={{ display: 'flex', gap: 1, cursor: "pointer" }}>
                <Avatar
                  src={`${domainName}/assets/${conversation?.recipients[0]?.picturePath}`}
                  sx={{ height: '56px', width: '56px' }}
                />
                <Box pl={2} sx={{ display: {md:"block", xs: "none"}}}>
                  <Typography>
                    <b>{conversation?.recipients[0]?.firstName + ' ' + conversation?.recipients[0]?.lastName}</b>{' '}
                    {conversation?.text}
                  </Typography>
                  <TimeAgo timestamp={conversation?.createdAt} />
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatList;
