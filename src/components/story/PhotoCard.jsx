import { Avatar, Box, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setEditPhotoOrVideo } from '~/store/storySlice';

const PhotoCard = () => {
  const dispatch = useDispatch()
  return (
    <>
      <Box
        onClick={() => {
          dispatch(setEditPhotoOrVideo())
        }}
        className="roseAndRed"
        sx={{
          position: "relative",
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
          <CollectionsIcon />
        </Avatar>
        <Typography mt={1} color="text.submain" fontWeight="500">
          Create a photo story
        </Typography>
      </Box>
    </>
  );
};

export default PhotoCard;
