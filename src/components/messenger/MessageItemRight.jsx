import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { domainName } from '~/utils/fetchData';

const MessageItemRight = ({ message }) => {
  return (
    <Box
      sx={{
        my: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        mr: 1,
      }}
    >
      <Typography
        sx={{
          mr: 1,
          display: 'inline-block',
          padding: '8px 12px',
          borderRadius: '15px',
          backgroundColor: 'background.submain',
        }}
      >
        {message.text}
      </Typography>
      <Avatar src={`${domainName}/assets/${message.sender.picturePath}`}/>
    </Box>
  );
};

export default MessageItemRight;
