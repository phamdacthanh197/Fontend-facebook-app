import React, { useEffect, memo } from 'react';
import { Avatar, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '~/store/messengerSlice';

import FlexBetween from './FlexBetween';
import { getUserDetail } from '~/store/actions/userAction';
import { getChatBox } from '~/store/actions/messageAction';
import { domainName } from '~/utils/fetchData';

const FriendList = () => {
  console.log("friend list")
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userDetail = useSelector((state) => state.user.userDetail);
  useEffect(() => {
    dispatch(getUserDetail(auth));
  },[]);
  const handleClick = (friend) => {
    dispatch(getChatBox({friend, auth}))
  } 
  const isNonMobileDevice = useMediaQuery('(min-width:900px)');
  return (
    <>
      {isNonMobileDevice && (
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            width: { xl: '360px', lg: '280px', md: '280px' },
            overflow: 'auto',
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <FlexBetween>
            <Typography pl={1} variant="h5">
              Contact
            </Typography>
            <Box>
              <IconButton>
                <VideoCallIcon />
              </IconButton>
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
              <IconButton>
                <LinearScaleOutlinedIcon />
              </IconButton>
            </Box>
          </FlexBetween>
          <Box py={1}>
            {userDetail?.friends?.map((friend) => (
              <Button
                key={friend._id}
                onClick={() => handleClick(friend)}
                fullWidth
                sx={{
                  textTransform: 'none',
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <Avatar
                  src={`${domainName}/assets/${friend.picturePath}`}
                  sx={{
                    height: '28px',
                    width: '28px',
                    marginRight: '8px',
                  }}
                />
                <Typography variant="h6" color="text.main" fontSize="bold">
                  {friend.firstName + ' ' + friend.lastName}
                </Typography>
              </Button>
            ))}
          </Box>
          <Divider variant="middle" />
          <Box>
            <Typography pl={1} py={1}>
              Group Conversation
            </Typography>
            <Button
              fullWidth
              sx={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Avatar
                sx={{
                  height: '28px',
                  width: '28px',
                  marginRight: '8px',
                }}
              />
              <Typography variant="h6" color="text.main" fontSize="bold">
                Ngua trang group
              </Typography>
            </Button>
            <Button
              fullWidth
              sx={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Avatar
                sx={{
                  height: '28px',
                  width: '28px',
                  marginRight: '8px',
                }}
              >
                <AddIcon />
              </Avatar>
              <Typography variant="h6" color="text.main" fontSize="bold">
                Create New Group
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default memo(FriendList);
