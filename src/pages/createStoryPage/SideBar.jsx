import { Avatar, Button, Divider, IconButton, Paper, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useContext } from 'react';
import FlexBetween from '~/components/FlexBetween';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import {useMediaQuery} from '@mui/material';

import { colorObejct } from '~/utils/constant';
import { shades } from '~/theme';
import { setClassName, setEditPhotoOrVideo, setEditText, setText } from '~/store/storySlice';
import Preview from '~/components/story/Preview';
import TextCard from '~/components/story/TextCard';
import PhotoCard from '~/components/story/PhotoCard';
import { createTextStory, createVideoStory } from '~/store/actions/storyAction';
import { domainName } from '~/utils/fetchData';
import { socketContext } from '~/SocketProvider';

const SideBar = () => {
  console.log("sideBar story")
  const { auth,story } = useSelector(state => state)
  const socket = useContext(socketContext)
  const openEditText = useSelector(state => state.story.editText)
  const openEditPhotoOrVideo = useSelector(state => state.story.editPhotoOrVideo)
  const editPhotoOrVideoOpen = useSelector(state => state.story.editPhotoOrVideo)
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:900px)")
  const handleChange = (e) => {
    dispatch(setText(e.target.value));
  };
  const handleClickCreateTextStory = () => {
    dispatch(createTextStory({auth,story,socket}))
  }
  const handleCickCreateVideoStory = () => {
    dispatch(createVideoStory({auth,story,socket}))
  }
  return (
    <Paper sx={{ height: '100%', flex: 1 }}>
      <Box height="56px" />
      <Divider />
      <FlexBetween height="56px" p={2} sx={{ position: 'sticky' }}>
        <Typography variant="h4" fontWeight="500">
          Your Story
        </Typography>
        <IconButton sx={{ backgroundColor: 'background.submain' }}>
          <SettingsIcon />
        </IconButton>
      </FlexBetween>
      <Box
        sx={{
          px: 2,
          overflow: 'scroll',
          width: '100%',
          pb: 8,
          height: 'calc(100% - (56px + 56px))',
        }}
      >
        <Box
          sx={{
            p: 2,
            gap: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Avatar src={`${domainName}/assets/${auth.user.picturePath}`} sx={{ height: '60px', width: '60px' }} />
          <Typography variant="h5" fontWeight="450">
            {auth.user.firstName + " " + auth.user.lastName}
          </Typography>
        </Box>
        <Divider />
        { openEditText && <Box height="auto" py={2}>
          <textarea
            onChange={handleChange}
            placeholder="Start typing"
            style={{
              fontSize: '15px',
              fontFamily: 'Rubik sans-serif',
              padding: '8px 8px',
              resize: 'none',
              height: '146px',
              width: '100%',
              border: '1px solid rgba(0,0,0,0.2)',
            }}
          ></textarea>
          <Paper
            elevation={2}
            sx={{
              mt: 2,
              p: 1,
              width: '100%',
              height: '158px',
            }}
          >
            <Typography>Backgrounds</Typography>
            <Box sx={{ display: 'flex', gap: 1, pt: 1 }}>
              {colorObejct.map((item, index) => (
                <Box
                  onClick={() => dispatch(setClassName({ className: item.className }))}
                  key={index}
                  className={item.className}
                  sx={{ cursor: 'pointer', borderRadius: '999px', height: '38px', width: '38px' }}
                ></Box>
              ))}
            </Box>
          </Paper>
        </Box> }

        { openEditText && <Preview width="100%"  hide="none" />}
        { openEditPhotoOrVideo && <Preview width="100%" hide="none" getPhotoVideo={editPhotoOrVideoOpen} />}

        { !isNonMobile && <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", mt: 4, gap: 1}}>
          <TextCard />
          <PhotoCard />
        </Box>}
      </Box>
      { openEditText && <Paper
        elevation={2}
        sx={{
          position: 'sticky',
          bottom: 0,
          gap: 1,
          height: '72px',
          widht: '100%',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={() => dispatch(setEditText())}
          size="large"
          variant="outlined"
          sx={{
            flex: 1,
            color: 'text.main',
            '&:hover': { backgroundColor: 'red' },
          }}
        >
          Discard
        </Button>
        <Button
          onClick={() => handleClickCreateTextStory()}
          size="large"
          variant="contained"
          sx={{
            flex: 1,
            backgroundColor: shades.blue[500],
            color: 'text.submain',
            '&:hover': { backgroundColor: shades.blue[400] },
          }}
        >
          Share to story
        </Button>
      </Paper>}

      { openEditPhotoOrVideo && <Paper
        elevation={2}
        sx={{
          position: 'sticky',
          bottom: 0,
          gap: 1,
          height: '72px',
          widht: '100%',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={() => dispatch(setEditPhotoOrVideo())}
          size="large"
          variant="outlined"
          sx={{
            flex: 1,
            color: 'text.main',
            '&:hover': { backgroundColor: 'red' },
          }}
        >
          Discard
        </Button>
        <Button
          onClick={() => handleCickCreateVideoStory()}
          size="large"
          variant="contained"
          sx={{
            flex: 1,
            backgroundColor: shades.blue[500],
            color: 'text.submain',
            '&:hover': { backgroundColor: shades.blue[400] },
          }}
        >
          Share to story
        </Button>
      </Paper>}
    </Paper>
  );
};

export default SideBar;
