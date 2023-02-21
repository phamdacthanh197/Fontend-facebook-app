import React from 'react';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import FlexBetween from './FlexBetween';
import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import TimeAgo from './TimeAgo';
import { URL } from '~/utils/fetchData';

const NotificationList = () => {
  const notifies = useSelector((state) => state.notify.notifies);
  return (
    <Box
      sx={{
        backgroundColor: 'background.main',
        height: { lg: '650px', xs: '450px' },
        width: '360px',
      }}
    >
      <FlexBetween px={2} py={'12px'} sx={{ width: '100%', height: '48px' }}>
        <Typography variant="h4" fontWeight="bold">
          Notifications
        </Typography>
        <LinearScaleIcon sx={{ fontSize: '20px' }} />
      </FlexBetween>
      <Box pl={2}>
        <Button variant="outlined">All</Button>
        <Button variant="string">Unread</Button>
      </Box>
      <FlexBetween px={2}>
        <Typography variant="h5" fontWeight="bold">
          Earlier
        </Typography>
        <Button sx={{ textTransform: 'none', fontSize: '15px' }}>See all</Button>
      </FlexBetween>
        <Box  px={2} py={1} sx={{ display: 'flex',flexDirection: "column" ,gap: 1, height: '100vh' }}>
      {notifies?.map((notify, index) => (
          <Box key={notify._id + index} sx={{ display: 'flex' }}>
            <Avatar src={`${URL}/assets/${notify?.user?.picturePath}`} sx={{ height: '56px', width: '56px' }} />
            <Box pl={2}>
              <Typography>
                <b>{notify.user.firstName + " " + notify.user.lastName}</b> {notify.text}: "{notify.content}"
              </Typography>
              <TimeAgo timestamp={notify.createdAt}/>
            </Box>
          </Box>
      ))}
        </Box>
    </Box>
  );
};

export default NotificationList;
