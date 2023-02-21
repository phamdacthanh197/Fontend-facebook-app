import { Avatar, Box, InputBase, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import MissedVideoCallIcon from '@mui/icons-material/MissedVideoCall';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CollectionsIcon from '@mui/icons-material/Collections';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import GifBoxIcon from '@mui/icons-material/GifBox';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';

import FlexBetween from '../FlexBetween';
import { shades } from '~/theme';
import { setOpen } from '~/store/messengerSlice';
import { useEffect } from 'react';
import MessageItemLeft from './MessageItemLeft';
import MessageItemRight from './MessageItemRight';
import { createMessage } from '~/store/actions/messageAction';
import { socketContext } from '~/SocketProvider';
import { URL } from '~/utils/fetchData';


const MessengerCard = ({ flex }) => {
  const socket = useContext(socketContext);
  console.log('MessengerCard');
  const auth = useSelector((state) => state.auth);
  const openMessengerCard = useSelector((state) => state.messenger.open);
  const friend = useSelector((state) => state.user.friendDetail);
  const messages = useSelector((state) => state.messenger.messages);
  console.log(messages);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setOpen());
  const hanlleKeyDown = (e) => {
    let key = e.key;
    if (key === 'Enter') {
      dispatch(createMessage({ friend, auth, text, socket }));
      setText('');
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    if (openMessengerCard) {
      var objDiv = document.getElementById('divExample');
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  });
  return (
    <>
      {openMessengerCard && (
        <Paper
          elevation={1}
          sx={{
            height: '450px',
            width: '328px',
            position: 'fixed',
            bottom: '0px',
            right: '200px',
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 1,
              width: '100%',
              height: '48px',
            }}
          >
            <FlexBetween>
              <FlexBetween>
                <Avatar
                  src={`${URL}/assets/${friend?.picturePath}`}
                  sx={{ height: '32px', width: '32px' }}
                />
                <Box ml={1}>
                  <Typography variant="h5" fontWeight="500">
                    {friend?.firstName + ' ' + friend?.lastName}
                  </Typography>
                  <Typography variant="body2">Active now</Typography>
                </Box>
              </FlexBetween>
              <FlexBetween gap={1}>
                <CallIcon sx={{ color: shades.blue[500], fontSize: '26px', cursor: 'pointer' }} />
                <MissedVideoCallIcon sx={{ color: shades.blue[500], fontSize: '26px', cursor: 'pointer' }} />
                <MoreHorizIcon sx={{ color: shades.blue[500], fontSize: '26px', cursor: 'pointer' }} />
                <CloseIcon
                  onClick={handleClick}
                  sx={{ color: shades.blue[500], fontSize: '26px', cursor: 'pointer' }}
                />
              </FlexBetween>
            </FlexBetween>
          </Paper>
          <Box
            id="divExample"
            sx={{
              height: '347px',
              width: '100%',
              overflow: 'auto',
              overflowAnchor: 'none',
            }}
          >
            <Box
              sx={{
                pt: 4,
                height: '194px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <Avatar
                src={`${URL}/assets/${friend?.picturePath}`}
                sx={{ height: '60px', width: '60px' }}
              />
              <Typography variant="h5" fontWeight="500">
                {friend?.firstName + ' ' + friend?.lastName}
              </Typography>
              <Typography variant="body2">Facebook</Typography>
              <Typography variant="body2">You are friend on facebook</Typography>
              <Typography variant="body2">Live in {friend?.location} Viet Nam</Typography>
            </Box>
            <Box>
              {messages?.map((message, index) => (
                <Box key={message._id}>
                  {message.sender._id === auth.user._id ? (
                    <MessageItemRight message={message} />
                  ) : (
                    <MessageItemLeft message={message} />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          <FlexBetween sx={{ width: '100%', height: '60px', py: 2, px: 1, position: 'sticky' }}>
            <AddCircleIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
            <CollectionsIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
            <GifBoxIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
            <IntegrationInstructionsIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
            <Box
              sx={{
                borderRadius: '999px',
                position: 'relative',
                height: '36px',
                width: '148px',
                backgroundColor: 'background.submain',
              }}
            >
              <InputBase
                value={text}
                onKeyDown={hanlleKeyDown}
                onChange={handleChange}
                placeholder="Aa"
                sx={{
                  pl: 2,
                  height: '36px',
                  width: '80%',
                }}
              />
              <EmojiEmotionsIcon
                sx={{ cursor: 'pointer', color: shades.blue[500], position: 'absolute', right: '4px', top: '8px' }}
              />
            </Box>
            <ThumbUpAltIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
          </FlexBetween>
        </Paper>
      )}

      {flex && (
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            width: '100%',
            flex: flex,
            height: '100%',
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 1,
              width: '100%',
              height: '48px',
            }}
          >
            <FlexBetween>
              <FlexBetween>
                <Avatar
                  src={`${URL}/assets/${friend?.picturePath}`}
                  sx={{ height: '32px', width: '32px' }}
                />
                <Box ml={1}>
                  <Typography variant="h5" fontWeight="500">
                    {friend?.firstName + ' ' + friend?.lastName}
                  </Typography>
                  <Typography variant="body2">Active now</Typography>
                </Box>
              </FlexBetween>
              <FlexBetween gap={1}>
                <CallIcon sx={{ color: shades.blue[500], fontSize: '26px', cursor: 'pointer' }} />
                <MissedVideoCallIcon sx={{ color: shades.blue[500], fontSize: '26px', cursor: 'pointer' }} />
                <MoreHorizIcon sx={{ color: shades.blue[500], fontSize: '26px', cursor: 'pointer' }} />
                {/* <CloseIcon onClick={handleClick} sx={{ color: shades.blue[500], fontSize: '26px', cursor: 'pointer' }} /> */}
              </FlexBetween>
            </FlexBetween>
          </Paper>

          <Box
            id="divExample"
            sx={{
              overflowAnchor: "none",
              height: '85%',
              width: '100%',
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                pt: 4,
                height: '194px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <Avatar
                src={`${URL}/assets/${friend?.picturePath}`}
                sx={{ height: '60px', width: '60px' }}
              />
              <Typography variant="h5" fontWeight="500">
                {friend?.firstName + ' ' + friend?.lastName}
              </Typography>
              <Typography variant="body2">Facebook</Typography>
              <Typography variant="body2">You are friend on facebook</Typography>
              <Typography variant="body2">Live in {friend?.location} Viet Nam</Typography>
            </Box>
            <Box>
              {messages?.map((message, index) => (
                <Box key={message._id}>
                  {message.sender._id === auth.user._id ? (
                    <MessageItemRight message={message} />
                  ) : (
                    <MessageItemLeft message={message} />
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          <FlexBetween
            sx={{
              width: '100%',
              height: '60px',
              py: 2,
              px: 1,
              position: 'absolute',
              bottom: 0,
            }}
          >
            <AddCircleIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
            <CollectionsIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
            <GifBoxIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
            <IntegrationInstructionsIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
            <Box
              sx={{
                position: 'relative',
                height: '36px',
                width: '80% ',
              }}
            >
              <InputBase
                value={text}
                onKeyDown={hanlleKeyDown}
                onChange={handleChange}
                placeholder="Aa"
                sx={{
                  backgroundColor: 'background.submain',
                  borderRadius: '999px',
                  pl: 2,
                  height: '36px',
                  width: '100%',
                }}
              />
              <EmojiEmotionsIcon
                sx={{ cursor: 'pointer', color: shades.blue[500], position: 'absolute', right: '4px', top: '8px' }}
              />
            </Box>
            <ThumbUpAltIcon sx={{ cursor: 'pointer', color: shades.blue[500] }} />
          </FlexBetween>
        </Paper>
      )}
    </>
  );
};

export default MessengerCard;
