import React, { useEffect } from 'react';
import { Box, Typography, InputBase, IconButton, Avatar, Popover, useMediaQuery } from '@mui/material';
import { SearchOutlined, Home, OndemandVideo, Storefront, AppsOutlined, Close } from '@mui/icons-material';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Tab, Tabs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';

import FlexBetween from '~/components/FlexBetween';
import logoHome from '~/assets/logo_home.png';
import AcountMenu from '~/components/Header/AcountMenu';
import ChatList from '~/components/ChatList';
import NotificationList from '~/components/NotificationList';
import MenuCard from '~/components/MenuCard';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifies } from '~/store/actions/notifyAction';
import { domainName } from '~/utils/fetchData';

const NavBar = () => {
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);
  const notifies = useSelector((state) => state.notify.notifies);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDeskTopScreen = useMediaQuery('(min-width:1100px)');
  const searchBreakpoint = useMediaQuery('(min-width:1235px)');
  const [value, setValue] = React.useState('1');
  const { pathname } = useLocation();
  const isHide = pathname === '/' ? true : pathname === '/story/create' ? true : false;
  const isStoryPage = Boolean(pathname.includes('/story'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [appMenu, setAppMenu] = React.useState(null);
  const [messenger, setMessenger] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [acount, setAcount] = React.useState(null);

  const handleClickAppMenu = (event) => {
    setAppMenu(event.currentTarget);
  };
  const handleClloseAppMenu = () => {
    setAppMenu(null);
  };
  const handleClickMessenger = (event) => {
    setMessenger(event.currentTarget);
  };
  const handleClloseMessenger = () => {
    setMessenger(null);
  };
  const handleClickNotification = (event) => {
    setNotification(event.currentTarget);
  };
  const handleClloseNotification = () => {
    setNotification(null);
    
  };
  const handleClickAcount = (event) => {
    setAcount(event.currentTarget);
  };
  const handleClloseAcount = () => {
    setAcount(null);
  };

  const openAppMenu = Boolean(appMenu);
  const openMessenger = Boolean(messenger);
  const openNotification = Boolean(notification);
  const openAcount = Boolean(acount);

  const appMenuId = openAppMenu ? 'simple-popover' : undefined;
  const messengerId = openMessenger ? 'simple-popover' : undefined;
  const notificationId = openNotification ? 'simple-popover' : undefined;
  const acountId = openAcount ? 'simple-popover' : undefined;
  useEffect(() => {
    if(isHide) {
      console.log ("navbar")
    } else {
      dispatch(getNotifies({auth}))
    }
  },[isHide])
  return (
    <>
      {!isHide && (
        <FlexBetween
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10,
            width: '100%',
            height: '56px',
            backgroundColor: 'background.main',
          }}
        >
          <FlexBetween ml={2}>
            {isStoryPage && (
              <IconButton
                onClick={() => navigate('/home')}
                sx={{ backgroundColor: 'background.submain', height: '40px', width: '40px', mx: 1 }}
              >
                <CloseIcon />
              </IconButton>
            )}
            <img
              onClick={() => navigate('/home')}
              style={{
                cursor: 'pointer',
                height: '40px',
                width: '40px',
              }}
              src={logoHome}
              alt="home logo"
            />
            {isDeskTopScreen ? (
              <Box
                sx={{
                  ml: 2,
                  backgroundColor: 'background.submain',
                  borderRadius: '999px',
                  height: '40px',
                  width: searchBreakpoint ? '240px' : '180px',
                }}
              >
                <IconButton sx={{ backgroundColor: 'background.submain', height: '39px', width: '40px' }}>
                  <SearchOutlined />
                </IconButton>
                <InputBase
                  placeholder="Search Facebook"
                  sx={{
                    pl: '2px',
                    borderRadius: '999px',
                    height: '40px',
                    width: '132px',
                  }}
                />
              </Box>
            ) : (
              <IconButton sx={{ backgroundColor: 'background.submain', height: '40px', width: '40px', ml: 1 }}>
                <SearchOutlined />
              </IconButton>
            )}
          </FlexBetween>
          {!isStoryPage && (
            <Box
              sx={{
                width: '588px',
                typography: 'body1',
                display: { xs: 'none', sm: 'block' },
                position: 'absolute',
                left: '50%',
                transform: { md: 'translateX(-53%)', xs: 'translateX(-60%)' },
              }}
            >
              <Tabs centered value={value} onChange={handleChange}>
                <Tab
                  icon={<Home sx={{ fontSize: '28px', width: { lg: '114px' } }} />}
                  value="1"
                  component={Link}
                  to="/home"
                />
                <Tab
                  icon={<OndemandVideo sx={{ fontSize: '28px', width: { lg: '114px' } }} value="2" />}
                  component={Link}
                  to="/watch"
                />
                <Tab
                  icon={<Storefront sx={{ fontSize: '28px', width: { lg: '114px' } }} />}
                  value="3"
                  component={Link}
                  to="/market"
                />
                <Tab
                  icon={<SportsEsportsOutlinedIcon sx={{ fontSize: '28px', width: { lg: '114px' } }} />}
                  value="4"
                  component={Link}
                  to="/game"
                />
              </Tabs>
            </Box>
          )}
          <FlexBetween mr={2} gap={2}>
            <IconButton
              sx={{
                backgroundColor: 'background.submain',
                height: '40px',
                width: '40px',
                color: appMenu ? 'primary.main' : 'undefined',
                '&:hover': { color: 'primary.main' },
              }}
              aria-describedby={appMenuId}
              onClick={handleClickAppMenu}
            >
              <AppsOutlined sx={{ fontSize: '28px' }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'background.submain',
                height: '40px',
                width: '40px',
                color: messenger ? 'primary.main' : 'undefined',
                '&:hover': { color: 'primary.main' },
              }}
              aria-describedby={messengerId}
              onClick={handleClickMessenger}
            >
              <SendIcon sx={{ fontSize: '28px' }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'background.submain',
                height: '40px',
                width: '40px',
                color: notification ? 'primary.main' : 'undefined',
                '&:hover': { color: 'primary.main' },
              }}
              aria-describedby={notificationId}
              onClick={handleClickNotification}
            >
              <Badge badgeContent={notifies?.length} color="primary">
                <NotificationsActiveIcon sx={{ fontSize: '28px' }} />
              </Badge>
            </IconButton>
            <Avatar
              src={`${domainName}/assets/${user.picturePath}`}
              alt="avata image "
              sx={{
                cursor: 'pointer',
              }}
              aria-describedby={acountId}
              onClick={handleClickAcount}
            />
          </FlexBetween>

          {/* POPOVER APP MENU */}
          <Popover
            id={appMenuId}
            open={openAppMenu}
            anchorEl={appMenu}
            onClose={handleClloseAppMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box
              sx={{
                overflow: 'auto',
                backgroundColor: 'background.submain',
                height: { lg: '650px', xs: '450px' },
                width: { lg: '605px', xs: '360px' },
              }}
            >
              <Box
                sx={{
                  position: 'sticky',
                  top: '0',
                  width: '100%',
                  height: '50px',
                  backgroundColor: 'background.submain',
                  zIndex: 2,
                }}
              >
                <Typography p={1.5} variant="h3" fontWeight="bold">
                  Menu
                </Typography>
              </Box>

              <MenuCard />
            </Box>
          </Popover>

          {/* MESSENGER POPOVER */}
          <Popover
            id={messengerId}
            open={openMessenger}
            anchorEl={messenger}
            onClose={handleClloseMessenger}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <ChatList handleClloseMessenger={handleClloseMessenger} />
          </Popover>

          {/* NOTIFICATION POPOVER */}
          <Popover
            id={notificationId}
            open={openNotification}
            anchorEl={notification}
            onClose={handleClloseNotification}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <NotificationList />
          </Popover>

          {/* ACOUNT POPOVER */}
          <Popover
            id={acountId}
            open={openAcount}
            anchorEl={acount}
            onClose={handleClloseAcount}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <AcountMenu handleClloseAcount={handleClloseAcount} />
          </Popover>
        </FlexBetween>
      )}
    </>
  );
};

export default NavBar;
