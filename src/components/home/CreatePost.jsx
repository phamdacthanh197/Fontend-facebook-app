import React, { useEffect, memo } from 'react';
import { Box, Avatar, Paper, Button, Divider, Typography, IconButton, useTheme } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MissedVideoCallIcon from '@mui/icons-material/MissedVideoCall';
import PublicIcon from '@mui/icons-material/Public';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Dropzone from 'react-dropzone';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { shades } from '~/theme';
import FlexBetween from '../FlexBetween';
import CardMedia from '../story/CardMedia';
import { createPost } from '~/store/actions/postAction';
import { domainName } from '~/utils/fetchData';

const style = {
  borderRadius: '20px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  px: 2,
  pb: 2,
};
const CreatePost = () => {
  const dispatch = useDispatch()
  const { auth: {user,token},auth, socket} = useSelector(state => state)
  const { palette } = useTheme();
  const [textarea, setTextare] = useState('')
  const [open, setOpen] = React.useState(false);
  const [disable, setDisble ] = useState(true);
  const [choseMedia, setChoseMedia] = React.useState(true);
  const [file, setFile] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitEvent = () => {
    dispatch(createPost({file,textarea,token,user,handleCloseModal,socket,auth}))
  }

  const handleCloseModal = () => {
    setTextare("")
    setDisble(true);
    setOpen(false);
    setFile();
  }

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handleCloseDropzone = () => {
    if(textarea?.length > 0) {
      console.log("close the dropzone")
    } else {
      setDisble(true)
    }
    setChoseMedia(false);
    setFile();

  };

  const handleChange = (files) => {
    const file = files[0];
    file.preview = URL.createObjectURL(file);
    setFile(file);
  };

  useEffect(() => {
    textarea.length > 0 || file ? setDisble(false) : setDisble(true)
  },[textarea])
  const handleChangeText = (e) => {
    setTextare(e.target.value)
  }
  return (
    <Paper elevation={2} sx={{ height: '125px', width: '100%', my: 2 }}>
      <Box sx={{ height: '65px', widht: '100%', p: 2, display: 'flex' }}>
        <Avatar src={`${domainName}/assets/${user.picturePath}`} sx={{ width: '40px', height: '40px', cursor: 'pointer' }} />
        <Box
          onClick={handleOpen}
          placeholder={`what's on your mind ${user.firstName + " " + user.lastName}`}
          sx={{
            pl: 2,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'text.main',
            ml: 1,
            borderRadius: '999px',
            height: '40px',
            width: '100%',
            backgroundColor: 'background.submain',
            '&:hover': { backgroundColor: shades.grey[100] },
          }}
        >
          <Typography>What's on your mind Dac Thanh</Typography>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ height: 'auto', widht: '100%', p: 1, display: 'flex', justifyContent: 'center' }}>
        <Button variant="string" size="large" sx={{ textTransform: 'none', flex: 1 }}>
          <MissedVideoCallIcon sx={{ color: 'red', fontSize: '30px' }} />
          <Typography>Live video</Typography>
        </Button>
        <Button onClick={handleOpen} variant="string" size="large" sx={{ textTransform: 'none', flex: 1 }}>
          <CollectionsIcon sx={{ color: 'green', fontSize: '30px' }} />
          <Typography>Photo/Video</Typography>
        </Button>
        <Button variant="string" size="large" sx={{ textTransform: 'none', flex: 1 }}>
          <InsertEmoticonIcon sx={{ color: 'yellow', fontSize: '30px' }} />
          <Typography>Feeling/Activity</Typography>
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box
              sx={{
                width: '"100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                position="relative"
                sx={{
                  width: '100%',
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  Create Post
                </Typography>
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    backgroundColor: 'primary',
                    position: 'absolute',
                    right: '0',
                    top: '12px',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
              <Box
                sx={{
                  py: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Avatar src={`${domainName}/assets/${user.picturePath}`} sx={{ height: '50px', width: '50px' }} />
                <Box>
                  <Typography variant="h5" fontWeight="500">
                    { user.firstName + " " + user.lastName}
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'background.submain',
                      p: 1,
                      gap: 1,
                    }}
                  >
                    <PublicIcon />
                    <Typography variant="body1" fontWeight="500">
                      Public
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <textarea
                onChange={(e) => handleChangeText(e)}
                value={textarea}
                autoFocus
                style={{
                  color: `${palette.text.main}`,
                  backgroundColor: 'transparent',
                  fontFamily: 'Rubik sans-serif',
                  outline: 'none',
                  border: 'none',
                  resize: 'none',
                  width: '100%',
                  height: '60px',
                }}
                placeholder={`what's is on mind ${user.firtName + " " + user.lastName}`}
              />

              {choseMedia && (
                <Box sx={{ position: 'relative' }}>
                  <Dropzone
                    
                    acceptedFiles=".jpg,.jpeg,.png.mp4,.mkv,.avi"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      handleChange(acceptedFiles);
                      setDisble(false)
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`1px solid ${palette.secondary.light}`}
                        sx={{
                          position: 'relative',
                          p: 1,
                          cursor: 'pointer',
                          height: '195px',
                          width: '100%',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            backgroundColor: 'background.submain',
                            width: '100%',
                            height: '100%',
                            '&:hover': {
                              backgroundColor: 'background.halfmain',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Avatar sx={{ color: 'text.main' }}>
                              <PermMediaIcon />
                            </Avatar>
                            <Typography variant="h4" fontWeight="500">
                              Add Photos/Videos
                            </Typography>
                            <Typography variant="body1">or drag and drop</Typography>
                          </Box>
                          {file && (
                            <Box
                              sx={{
                                zIndex: 10,
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                              }}
                            >
                              <Box
                                sx={{
                                  border: "1px solid grey",
                                  position: 'absolute',
                                  cursor: 'pointer',
                                  borderRadius: '10px',
                                  p: 1,
                                  backgroundColor: 'background.main',
                                  color: 'text.main',
                                  top: '8px',
                                  left: '8px',
                                  '&:hover': { backgroundColor: 'background.halfmain' },
                                }}
                              >
                                Change File
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Dropzone>
                  <IconButton
                    onClick={
                      handleCloseDropzone
                    }
                    sx={{
                      position: 'absolute',
                      backgroundColor: 'background.main',
                      color: 'text.main',
                      top: '16px',
                      right: '16px',
                      '&:hover': { backgroundColor: 'background.halfmain' },
                      zIndex: 10,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <CardMedia file={file} />
                </Box>
              )}

              <FlexBetween
                border={`1px solid ${palette.secondary.light}`}
                sx={{
                  my: 2,
                  height: '58px',
                  width: '100%',
                }}
              >
                <Typography variant="h5" fontWeight="500" ml={1}>
                  Add to your post{' '}
                </Typography>
                <FlexBetween gap={2}>
                  <AddPhotoAlternateIcon
                    onClick={() => setChoseMedia(true)}
                    sx={{ cursor: 'pointer', fontSize: '34px', color: 'green' }}
                  />
                  <PersonIcon sx={{ cursor: 'pointer', fontSize: '34px', color: 'blue' }} />
                  <InsertEmoticonIcon sx={{ cursor: 'pointer', fontSize: '34px', color: 'orange' }} />
                  <LocationOnIcon sx={{ cursor: 'pointer', fontSize: '34px', color: 'red' }} />
                  <AssistantPhotoIcon sx={{ cursor: 'pointer', fontSize: '34px', color: 'grey' }} />
                  <MoreHorizIcon sx={{ cursor: 'pointer', fontSize: '34px', color: 'grey' }} />
                </FlexBetween>
              </FlexBetween>
              <Button onClick={handleSubmitEvent} disabled={disable} variant="contained" fullWidth sx={{}}>
                Post
              </Button>
            </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default memo(CreatePost);
