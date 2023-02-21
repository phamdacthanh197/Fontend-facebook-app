import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { setEditPhotoOrVideo, setEditText } from '~/store/storySlice';
import { useDispatch } from 'react-redux';

const TextCard = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Box
        onClick={() => {
          dispatch(setEditText());
        }}
        className="rainBow"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          height: '330px',
          width: '220px',
          borderRadius: '20px',
          '&:hover': {
            opacity: '0.9',
          },
        }}
      >
        <Avatar sx={{ backgroundColor: 'text.submain', color: '#000', boxShadow: '0 0 5px rgba(255,255,255,1)' }}>
          <Typography fontWeight="bold">Aa</Typography>
        </Avatar>
        <Typography mt={1} color="text.submain" fontWeight="500">
          Create a text story
        </Typography>
      </Box>
    </>
  );
};

export default TextCard;
