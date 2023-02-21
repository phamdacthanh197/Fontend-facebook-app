import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

import Preview from '~/components/story/Preview';
import TextCard from '~/components/story/TextCard';
import PhotoCard from '~/components/story/PhotoCard';

const Content = () => {
  const editToolOpen = useSelector(state => state.story.editText)
  const editPhotoOrVideoOpen = useSelector(state => state.story.editPhotoOrVideo)
  const isNonMobile = useMediaQuery('(min-width:900px)');
  return (
    <>
      { isNonMobile && (
        <Box
          sx={{
            flex: 2,
            gap: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
              {!editToolOpen && !editPhotoOrVideoOpen && 
              <>
                <PhotoCard />
                <TextCard />
              </>
              }
          { editToolOpen && <Preview />}
          { editPhotoOrVideoOpen && <Preview getPhotoVideo={editPhotoOrVideoOpen}/>}
        </Box>
      )}
    </>
  );
};

export default Content;
