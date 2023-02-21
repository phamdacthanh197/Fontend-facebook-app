import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import CardMedia from './CardMedia';
import { makingFile } from '~/store/storySlice';

const Preview = ({ width, hide, getPhotoVideo }) => {
  console.log("Preview")
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const ref = useRef();
  const handleClick = (getPhotoVideo) => {
    if (getPhotoVideo) {
      ref.current?.click();
    }
  };
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      file.preview = URL.createObjectURL(file);
      setFile(file);
      dispatch(makingFile({file: file}))
    }
  };

  const isNonMobile = useMediaQuery('(min-width:900px)');
  const background = useSelector((state) => state.story.className);
  const text = useSelector((state) => state.story.text);
  // const [backgroundColor, setBackgroundColor] = useState(background);
  // useEffect(() => {
  //   setBackgroundColor(background);
  // }, [background]);

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          display: Boolean(hide) ? { xs: 'block', md: 'none' } : 'block',
          p: 2,
          height: '83%',
          width: width ? width : '83%',
        }}
      >
        <Typography sx={{ height: '20px', width: '100%' }} fontWeight="500" variant="h5">
          Preview
        </Typography>
        <Box
          onClick={() => handleClick(getPhotoVideo)}
          sx={{
            cursor: getPhotoVideo ? 'pointer' : 'undefined',
            mt: 2,
            mb: 1,
            backgroundColor: 'black',
            width: '100%',
            height: 'calc(100% - 30px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            className={background}
            sx={{
              position: 'relative',
              height: '90%',
              width: '306px',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                p: 1,
                color: '#fff',
                width: '290px',
                height: 'auto',
                wordBreak: 'break-word',
                textAlign: 'center',
              }}
            >
              {getPhotoVideo ? 'Chose Photo Or Images' : text}
            </Typography>
            <input
              accept="image/*,video/*"
              onChange={handleChange}
              ref={ref}
              id="my_file"
              type="file"
              style={{
                display: 'none',
              }}
            />
            <CardMedia file={file}  />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Preview;
