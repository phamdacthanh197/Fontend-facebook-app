import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { URL } from '~/utils/fetchData';

const MessageItemLeft = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        ml: 1,
        my: 1,
      }}
    >
      <Avatar src={`${URL}/assets/${message.sender.picturePath}`}/>
      <Typography
        sx={{
          ml: 1,
          display: 'inline-block',
          padding: '8px 12px',
          borderRadius: '15px',
          backgroundColor: 'background.submain',
        }}
      >
        { message.text }
      </Typography>
    </Box>
  );
};

export default MessageItemLeft;
