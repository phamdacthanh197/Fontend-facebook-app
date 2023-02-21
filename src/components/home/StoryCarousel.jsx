import React, { memo, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import SlowMotionVideoRoundedIcon from '@mui/icons-material/SlowMotionVideoRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Slider from 'react-slick';
import { Box } from '@mui/system';
import { Avatar, Button, Paper, Typography, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { URL } from '~/utils/fetchData';
import CardMedia from '../story/CardMedia';
import { getAllStories } from '~/store/actions/storyAction';

const StoryCarousel = () => {
  const auth = useSelector((state) => state.auth);
  const stories = useSelector((state) => state.story.stories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallDevice = useMediaQuery('(min-width: 470px');
  const isMediumDevice = useMediaQuery('(min-width: 600px');
  const slider = React.useRef(null);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  var settings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: isMediumDevice ? 5 : isSmallDevice ? 4 : 3,
    slidesToScroll: 2,
    initialSlide: 0,
  };

  useEffect(() => {
    dispatch(getAllStories(auth));
  }, []);
  return (
    <Paper elevation={2} sx={{ width: '100%', height: '287px' }}>
      <Tabs
        sx={{ height: '60px', borderBottom: 1, borderColor: 'divider' }}
        centered
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
      >
        <Tab icon={<AutoStoriesIcon />} iconPosition="start" label="Stories" />
        <Tab icon={<SlowMotionVideoRoundedIcon />} iconPosition="start" label="Reels" />
        <Tab icon={<VideoCallRoundedIcon />} iconPosition="start" label="Rooms" />
      </Tabs>
      <Box sx={{ height: '225px', width: '100%', py: '5px' }}>
        <Slider ref={slider} {...settings}>
          <Box
            onClick={() => navigate('/story/create')}
            sx={{
              cursor: 'pointer',
              marginBottom: '5px',
            }}
          >
            <Paper
              elevation={2}
              sx={{
                borderRadius: '15px',
                height: '200px',
                width: '112px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                style={{ height: '70%', width: '100%' }}
                src={`${URL}/assets/${auth.user.picturePath}`}
                alt="avatar image"
              />
              <Avatar sx={{ backgroundColor: 'primary.main', transform: 'translateY(-12px)' }}>
                <AddIcon />
              </Avatar>
              <Typography>Create Story</Typography>
            </Paper>
          </Box>
          {stories?.map((story, index) => (
            <Box
              onClick={() => navigate(`/story?storyId=${story._id}`)}
              key={story._id}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                marginBottom: '5px',
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  position: 'relative',
                  borderRadius: '15px',
                  height: '200px',
                  width: '112px',
                  overflow: 'hidden',
                }}
              >
                {story.source !== '' ? (
                  <CardMedia url={`${URL}/assets/${story.source}`} controls={false}/>
                ) : (
                  <Box className={story.background} sx={{ 
                    height: '100%', width: '100%' ,
                    display: "flex", alignItems: "center", 
                    }}>
                    <Typography
                      variant="h6"
                      sx={{
                        p: 1,
                        color: '#fff',
                        width: '100%',
                        height: 'auto',
                        wordBreak: 'break-word',
                        textAlign: 'center',
                      }}
                    >
                      {story.description}
                    </Typography>
                  </Box>
                )}
                <Avatar
                  sx={{
                    backgroundColor: 'primary.main',
                    position: 'absolute',
                    top: '10px',
                    left: '10px ',
                    height: '50px',
                    width: '50px',
                  }}
                >
                  <Avatar
                    src={`${URL}/assets/${story.user.picturePath}`}
                    sx={{ backgroundColor: 'black' }}
                  ></Avatar>
                </Avatar>
                <Typography sx={{ position: 'absolute', bottom: '10px', left: '20%', color: 'white' }}>
                  {story.user.firstName + ' ' + story.user.lastName} 
                </Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Box>
      <Avatar
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          top: '50%',
          left: 0,
          backgroundColor: 'background.main',
          boxShadow: '0 0 5px rgba(0,0,0,0.5)',
        }}
        onClick={() => slider?.current?.slickPrev()}
      >
        <KeyboardArrowLeftIcon color="text" />
      </Avatar>
      <Avatar
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          top: '50%',
          right: 0,
          backgroundColor: 'background.main',
          boxShadow: '0 0 5px rgba(0,0,0,0.5)',
        }}
        onClick={() => slider?.current?.slickNext()}
      >
        <KeyboardArrowRightIcon color="text" />
      </Avatar>
    </Paper>
  );
};

export default memo(StoryCarousel);
