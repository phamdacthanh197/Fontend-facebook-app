import { Box } from '@mui/system';
import React from 'react';
import FriendList from '~/components/FriendList';
import MessengerCard from '~/components/messenger/MessengerCard';
import SideBar from '../layout/Sidebar';
import Content from './Content.jsx';

const HomePage = () => {

  return (
    <Box
      sx={{
        pt: 8,
        width: "100vw",
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'background.main',
      }}
    >
      <Box
        sx={{
          overflow: 'auto',
          position: 'relative',
          height: '100%',
          width: '1280px',
          display: 'flex',
          justifyContent: { lg: 'center', md: 'flex-start', xs: 'center' },
          backgroundColor: 'background.submain',
        }}
      >
        <SideBar />
        <Content />
        <FriendList />
        <MessengerCard />
      </Box>
    </Box>
  );
};

export default HomePage;
