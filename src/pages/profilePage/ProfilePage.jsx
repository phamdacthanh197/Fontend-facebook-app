import { Avatar, Button, Divider, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useEffect } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { shades } from '~/theme';
import FlexBetween from '~/components/FlexBetween';
import PostCard from '~/components/home/PostCard';
import CreatePost from '~/components/home/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPost } from '~/store/actions/postAction';
import { getUserDetail } from '~/store/actions/userAction';
import { domainName } from '~/utils/fetchData';

const ProfilePage = () => {
  const { auth } = useSelector((state) => state);
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);
  const userPost = useSelector((state) => state.post.userPost);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getUserPost(auth));
    // dispatch(getUserDetail(auth));
  }, [dispatch, auth]);

  return (
    <Box
      sx={{
        minHeight: '100%',
        width: '100%',
        backgroundColor: 'background.submain',
        display: 'flex',
        flexDirection: 'column',
        alignItems: {md:'center', xs:'undefined'},
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          mt: 8,
          height: {lg: '632px', xs: "680px"},
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'red',
            width: {lg: "1100px", xs: '100%'},
            height: '406px',
          }}
        >
          <img
            src={`${domainName}/assets/${userDetail?.coverPhoto}`}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%  ',
            }}
            alt="avatar"
          />
          <Button
            color="secondary"
            size="large"
            variant="contained"
            sx={{
              textTransform: 'none',
              position: 'absolute',
              bottom: '24px',
              right: '32px',
              color: '#FFF',
            }}
          >
            <CameraAltIcon sx={{ mr: 1 }} />
            <Typography>Edit cover photo</Typography>
          </Button>
        </Box>

        <Box
          sx={{
            mb: '-32px',
            transform: {md: 'translateY(-60px)', xs: 'translateY(-30px)'},
            width: {lg: "1024px", md: "auto"},
            height: '215px',
            display: 'flex',
            flexDirection: {md: "row", xs: "column"},
            justifyContent: {md: "space-between", xs: "undefined"},
            alignItems: {md: "end", xs: "center"},
            gap: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
            }}
          >
            <Avatar
              src={`${domainName}/assets/${userDetail?.picturePath}`}
              sx={{
                height: '168px',
                width: '168px',
              }}
            />
            <Box
              sx={{
                ml: 2,
                mb: 1,
              }}
            >
              <Typography variant="h2" fontWeight="bold">
                {userDetail?.firstName + ' ' + userDetail?.lastName}
              </Typography>
              <Typography py={1} ml={1} variant="subtitle1">
                {userDetail?.friends?.length} friends
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  transform: 'translateX(10px)',
                }}
              >
                {userDetail?.friends?.slice(0, 8).map((friend, index) => (
                  <Avatar
                    src={`${domainName}/assets/${friend.picturePath}`}
                    key={friend._id}
                    sx={{
                      transform: `translateX(${-10 * index}px)`,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
          <Box mb={1}>
            <Button sx={{ mr: 1, textTransform: 'none', gap: 1 }} color="primary" variant="contained" size="large">
              <AddCircleIcon />
              <Typography>Add to story</Typography>
            </Button>
            <Button sx={{ textTransform: 'none', gap: 1 }} color="primary" variant="outlined" size="large">
              <EditIcon />
              <Typography>Add to story</Typography>
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: '1px', width: {lg:"1024px", md: "700px", sm: "0px"}, backgroundColor: 'grey' }}></Box>
        <Box
          sx={{
            width: {lg: "1024px", xs: "auto"},
            height: '60px',
            display: 'flex',
            flexDirection: "row",
            justifyContent: {lg: "flex-start", xs: "center"},
            alignItems: "center"
          }}
        >
          <FlexBetween sx={{ display: {xs: "none", sm: 'flex'}}}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab sx={{ textTransform: 'none', fontSize: '15px' }} label="Post" />
              <Tab sx={{ textTransform: 'none', fontSize: '15px' }} label="About" />
              <Tab sx={{ textTransform: 'none', fontSize: '15px' }} label="Friend" />
              <Tab sx={{ textTransform: 'none', fontSize: '15px' }} label="Videos" />
              <Tab sx={{ textTransform: 'none', fontSize: '15px' }} label="Check-ins" />
            </Tabs>
            <Button
              size="small"
              sx={{ color: 'text.main', opacity: '0.7', padding: '10px 16px', textTransform: 'none', fontSize: '15px' }}
            >
              More
              <ArrowDropDownIcon />
            </Button>
          </FlexBetween>
          <Button sx={{ display: {sm: "none", sx: "block"}, textTransform: 'none', gap: 1 }} color="primary" variant="outlined" size="large">
            <Typography>Menu list</Typography>
            <MenuBookIcon/>
          </Button>

        </Box>
      </Paper>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: {lg: "start", xs: "center"},
          flexDirection: {lg: "row", xs: "column"},
          width: {md: '1024px', xs: 'auto'},
          height: 'auto',
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={{ height: '100%', width: {lg:'40%', md: "60%" ,xs: "100%"} }}>
          <Paper
            elevation={3}
            sx={{
              my: 2,
              p: 2,
              height: '228px',
              width: '100%',
            }}
          >
            <Typography mb={2} variant="h4" fontWeight="bold">
              Intro
            </Typography>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <LocationOnIcon />
              <Typography fontSize={15}>From {userDetail?.location}</Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <WorkIcon />
              <Typography fontSize={15}>Job: {userDetail?.occupation}</Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <FavoriteIcon />
              <Typography fontSize={15}>Single</Typography>
            </Box>
            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '40px',
                backgroundColor: 'background.submain',
                borderRadius: '20px',
                '&:hover': { backgroundColor: shades.grey[100] },
              }}
            >
              <Typography sx={{ verticalAlign: 'bottom' }} variant="h5">
                Edit Intro
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              my: 2,
              p: 2,
              width: '100%',
            }}
          >
            <FlexBetween>
              <Typography variant="h4" fontWeight="bold">
                Photos
              </Typography>
              <Button sx={{ textTransform: 'none', fontSize: '15px' }}>See all photos</Button>
            </FlexBetween>
            <Box
              sx={{
                height: 'auto',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
              }}
            >
              {userPost
                .filter(
                  (post) =>
                    post.source !== '' &&
                    new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/).test(post.source),
                )
                .slice(0, 8)
                .map((post, index) => (
                  <img
                    style={{ height: '121px', width: '100%' }}
                    key={post._id + index}
                    src={`${domainName}/assets/${post.source}`}
                    alt="post"
                  />
                ))}
            </Box>
          </Paper>
          
          <Paper
            elevation={3}
            sx={{
              my: 2,
              p: 2,
              width: '100%',
            }}
          >
            <FlexBetween>
              <Typography variant="h4" fontWeight="bold">
                Friends
              </Typography>
              <Button sx={{ textTransform: 'none', fontSize: '15px' }}>See all friends</Button>
            </FlexBetween>
            <Typography mb={1} variant="subtitle1">
              {userDetail?.friends?.length} Frineds
            </Typography>
            <Box
              sx={{
                height: 'auto',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
              }}
            >
              {userDetail?.friends?.slice(0, 8).map((friend, index) => (
                <Box key={friend._id + index}>
                  <img
                    style={{ height: '121px', width: '100%' }}
                    src={`${domainName}/assets/${friend.picturePath}`}
                    alt="frineds"
                  />
                  <Typography variant="body1" fontWeight="bold">
                    {friend.firstName + ' ' + friend.lastName}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
          <Typography sx={{ display: {lg: "block", xs: 'none'}}} pb={2} textAlign="center" variant="h3">
            Meta @ 2023
          </Typography>
        </Box>

        <Box sx={{ overflow: {lg:'auto', xs: "none"}, height: '1300px', width: {md:'60%', xs: '100%'} }}>
          <CreatePost />
          {userPost.map((post, index) => (
            <PostCard key={post._id} postDetail={post} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
