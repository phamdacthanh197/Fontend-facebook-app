import React from 'react';
import { Box } from '@mui/system';
import { IconButton, Paper, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch } from 'react-redux';

import RegisterModal from './RegisterModal';
import Form from './Form';
import loginLogo from '~/assets/login_logo.svg';
import { setMode } from '~/store/authSlice';


const LoginPage = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery('(min-width:982px)');
  const isRegisterModal = useSelector((state) => state.modal.open);

  return (
    <Box
      position="relative"
      backgroundColor="background.submain"
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '980px',
          padding: '30px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: isNonMobile ? 'underfined' : 'center',
            marginRight: 0,
            paddingRight: isNonMobile ? '32px' : '0px',
            width: isNonMobile ? '580px' : 'auto',
            height: '168px',
            margin: 'auto',
            textAlign: isNonMobile ? 'underfined' : 'center',
          }}
        >
          <img
            style={{
              transform: 'translateX(-33px)',
              width: '301px',
              height: '106px',
            }}
            src={loginLogo}
            alt="faceBook images"
          />
          <Typography variant={isNonMobile ? 'h3' : 'h4'}>
            Facebook helps you connect and share with the people in your life.
          </Typography>
        </Box>
        <Box
          sx={{
            height: '396px',
            width: '396px',
            margin: 'auto',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: '370px',
              width: '100%',
            }}
          >
            <Form />
          </Paper>
          <Box mt={2}>
            <a style={{ textDecoration: 'none' }} href="/">
              <b>Create a page </b>
            </a>
            for a celebrity, brand or business
          </Box>
        </Box>
      </Box>
      <IconButton
        onClick={() => dispatch(setMode())}
        sx={{
          backgroundColor: 'background.main',
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
        <DarkModeIcon />
      </IconButton>
      {isRegisterModal && <RegisterModal />}
    </Box>
  );
};

export default LoginPage;
