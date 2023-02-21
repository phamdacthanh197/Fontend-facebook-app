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

const StoryHeader = () => {
  const navigate = useNavigate();
  const [appMenu, setAppMenu] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [acount, setAcount] = React.useState(null);

  const handleClickAppMenu = (event) => {
    setAppMenu(event.currentTarget);
  };
  const handleClloseAppMenu = () => {
    setAppMenu(null);
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
  const openNotification = Boolean(notification);
  const openAcount = Boolean(acount);

  const appMenuId = openAppMenu ? 'simple-popover' : undefined;
  const notificationId = openNotification ? 'simple-popover' : undefined;
  const acountId = openAcount ? 'simple-popover' : undefined;
  return (
    <>
      <FlexBetween
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10,
          width: '100%',
          height: '56px',
        }}
      >
        <FlexBetween px={2} gap={1}>
          <IconButton onClick={() => navigate("/home")}  sx={{ backgroundColor: "secondary.main", "&:hover": { backgroundColor: "secondary.light"}}}>
            <CloseIcon  sx={{ fontSize: "24px", color: "text.submain"}}/>
          </IconButton>
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
        </FlexBetween>

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
              color: notification ? 'primary.main' : 'undefined',
              '&:hover': { color: 'primary.main' },
            }}
            aria-describedby={notificationId}
            onClick={handleClickNotification}
          >
            <NotificationsActiveIcon sx={{ fontSize: '28px' }} />
          </IconButton>
          <Avatar
            src={avatar}
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
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  flex: 2,
                  mx: 2,
                  mb: 2,
                  height: 'auto',
                  borderRadius: '10px',
                  display: { xs: 'none', lg: 'block' },
                }}
              >
                <Box
                  sx={{
                    m: 2,
                    backgroundColor: 'background.submain',
                    borderRadius: '999px',
                    height: '40px',
                    width: 'auto',
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
                      width: 'auto',
                    }}
                  />
                </Box>
                <Typography pl={1} variant="h5" fontWeight="bold">
                  Social
                </Typography>
                {/* SOCIAL */}
                {categories
                  .filter((item) => item.category === 'Social')
                  .map((item, index) => (
                    <Button
                      key={index + item.category}
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <span>
                        <img
                          style={{ height: '28px', width: '28px', marginRight: '8px' }}
                          src={item.img}
                          alt={`${item.text} images`}
                        />
                      </span>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" color="text.main" fontSize="bold">
                          {item.text}
                        </Typography>
                        <Typography color="text.main">{item.describe}</Typography>
                      </Box>
                    </Button>
                  ))}
                <Divider variant="middle" />
                {/*  ENTERTAIMENT */}
                {categories
                  .filter((item) => item.category === 'Entertainment')
                  .map((item, index) => (
                    <Button
                      key={index + item.category}
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <span>
                        <img
                          style={{ height: '28px', width: '28px', marginRight: '8px' }}
                          src={item.img}
                          alt={`${item.text} images`}
                        />
                      </span>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" color="text.main" fontSize="bold">
                          {item.text}
                        </Typography>
                        <Typography color="text.main">{item.describe}</Typography>
                      </Box>
                    </Button>
                  ))}
                <Divider variant="middle" />
                {/*  SHOPPING */}
                {categories
                  .filter((item) => item.category === 'Shopping')
                  .map((item, index) => (
                    <Button
                      key={index + item.category}
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <span>
                        <img
                          style={{ height: '28px', width: '28px', marginRight: '8px' }}
                          src={item.img}
                          alt={`${item.text} images`}
                        />
                      </span>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" color="text.main" fontSize="bold">
                          {item.text}
                        </Typography>
                        <Typography color="text.main">{item.describe}</Typography>
                      </Box>
                    </Button>
                  ))}
                <Divider variant="middle" />
                {/*  PERSONAL */}
                {categories
                  .filter((item) => item.category === 'Personal')
                  .map((item, index) => (
                    <Button
                      key={index + item.category}
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <span>
                        <img
                          style={{ height: '28px', width: '28px', marginRight: '8px' }}
                          src={item.img}
                          alt={`${item.text} images`}
                        />
                      </span>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" color="text.main" fontSize="bold">
                          {item.text}
                        </Typography>
                        <Typography color="text.main">{item.describe}</Typography>
                      </Box>
                    </Button>
                  ))}
                <Divider variant="middle" />
                {/*  Professional */}
                {categories
                  .filter((item) => item.category === 'Professional')
                  .map((item, index) => (
                    <Button
                      key={index + item.category}
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <span>
                        <img
                          style={{ height: '28px', width: '28px', marginRight: '8px' }}
                          src={item.img}
                          alt={`${item.text} images`}
                        />
                      </span>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" color="text.main" fontSize="bold">
                          {item.text}
                        </Typography>
                        <Typography color="text.main">{item.describe}</Typography>
                      </Box>
                    </Button>
                  ))}
                <Divider variant="middle" />
                {/*  Community Resources */}
                {categories
                  .filter((item) => item.category === 'Community Resources')
                  .map((item, index) => (
                    <Button
                      key={index + item.category}
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <span>
                        <img
                          style={{ height: '28px', width: '28px', marginRight: '8px' }}
                          src={item.img}
                          alt={`${item.text} images`}
                        />
                      </span>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" color="text.main" fontSize="bold">
                          {item.text}
                        </Typography>
                        <Typography color="text.main">{item.describe}</Typography>
                      </Box>
                    </Button>
                  ))}
                <Divider variant="middle" />
                {/*  More from Meta */}
                {categories
                  .filter((item) => item.category === 'More from Meta')
                  .map((item, index) => (
                    <Button
                      key={index + item.category}
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <span>
                        <img
                          style={{ height: '28px', width: '28px', marginRight: '8px' }}
                          src={item.img}
                          alt={`${item.text} images`}
                        />
                      </span>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" color="text.main" fontSize="bold">
                          {item.text}
                        </Typography>
                        <Typography color="text.main">{item.describe}</Typography>
                      </Box>
                    </Button>
                  ))}
              </Paper>
              <Paper
                elevation={2}
                sx={{ flex: 1, mr: 1, borderRadius: '10px', height: '493px', position: 'sticky', top: '46px' }}
              >
                <Typography p={2} variant="h4" fontWeight="bold">
                  Create
                </Typography>
                {appMenuList.slice(0, 3).map((item, index) => (
                  <Button
                    key={index + item.text}
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: 'background.submain',
                        height: '36px',
                        width: '36px',
                        marginRight: '16px',
                        color: 'text.main',
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Typography variant="h6" color="text.main" fontSize="bold">
                      {item.text}
                    </Typography>
                  </Button>
                ))}
                <Divider />
                {appMenuList.slice(3).map((item, index) => (
                  <Button
                    key={index + item.text}
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: 'background.submain',
                        height: '36px',
                        width: '36px',
                        marginRight: '16px',
                        color: 'text.main',
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Typography variant="h6" color="text.main" fontSize="bold">
                      {item.text}
                    </Typography>
                  </Button>
                ))}
              </Paper>
            </Box>
          </Box>
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
          <Box
            sx={{
              overflow: 'auto',
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
            <Box pl={2} py={1} sx={{ display: 'flex', height: '100vh' }}>
              <Avatar sx={{ height: '56px', width: '56px' }} />
              <Box pl={2}>
                <Typography>
                  <b>Pham Dac Thanh</b> like your comments: "xin chao anh em"
                </Typography>
                <Typography>4 hours ago</Typography>
              </Box>
            </Box>
          </Box>
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
          <AcountMenu />
        </Popover>
      </FlexBetween>
    </>
  );
};

export default StoryHeader;
