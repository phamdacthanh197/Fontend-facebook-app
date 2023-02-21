import React from 'react';
import { Box, Typography, InputBase, IconButton, Avatar, Popover, Paper, Button, Divider } from '@mui/material';
import { SearchOutlined, AppsOutlined } from '@mui/icons-material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloseIcon from '@mui/icons-material/Close';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { useNavigate } from 'react-router-dom';

import FlexBetween from '~/components/FlexBetween';
import logoHome from '~/assets/logo_home.png';
import avatar from '~/assets/avatar.jpg';
import { categories } from '~/assets/sidebar_img';
import { appMenuList } from '~/utils/constant';
import AcountMenu from '~/components/Header/AcountMenu';
import StoryHeader from './StoryHeader';
import SideBar from './SideBar';
import Content from './Content';
import './storyStyle.css';

const StoryPage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: "100vh",
        display: 'flex',
        flexDirection: {md: "row", xs: 'column'},
        backgroundColor: 'background.submain',
        overflow: "hidden",
      }}
    >
      <StoryHeader />
      <SideBar />
      <Content />
    </Box>
  );
};
export default StoryPage;
