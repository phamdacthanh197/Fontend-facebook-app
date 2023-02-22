import { Avatar, Box, Button, Hidden, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Slider from 'react-slick';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import CardMedia from '~/components/story/CardMedia';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from '~/components/TimeAgo';
import { domainName } from '~/utils/fetchData';

const DisplayStory = () => {
  let params = (new URL(document.location)).searchParams;
  const auth = useSelector((state) => state.auth);
  const stories = useSelector((state) => state.story.stories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initial, setInitial] = useState();
  const slider = React.useRef(null);
  console.log(initial)
  var settings = {
    infinite: false,
    arrows: false,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initial
  };
  const handleClick = (id) => {
    slider.current.slickGoTo(stories.findIndex((el) => el._id === id))
  }
  useEffect(() => {
    let storyId = params.get('storyId');
    setInitial(stories.findIndex((el) => el._id === storyId))
  },[params])
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        pt: 6,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          display: { lg: 'block', xs: 'none' },
          p: 2,
          overflow: 'auto',
          height: '100%',
          flex: 1,
        }}
      >
        <Typography fontWeight="bold" variant="h4">
          Stories
        </Typography>
        <Box py={2}>
          <Button sx={{ mr: 1 }} variant="contained">
            Archive
          </Button>
          <Button variant="outlined">Settings</Button>
        </Box>
        <Typography fontWeight="500" variant="h5">
          Your Story
        </Typography>
        <Box
          onClick={() => navigate('/story/create')}
          sx={{ py: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1, cursor: 'pointer' }}
        >
          <Avatar sx={{ height: '60px', width: '60px', color: 'primary.main', backgroundColor: 'background.submain' }}>
            <AddIcon />
          </Avatar>
          <Box sx={{}}>
            <Typography fontWeight="500">Create a Story</Typography>
            <Typography variant="body2">Share a photo or write something</Typography>
          </Box>
        </Box>
        <Typography fontWeight="500" variant="h5">
          All Stories
        </Typography>
        {stories.map((story, index) => (
          <Box onClick={() => handleClick(story._id)} key={story._id + index} sx={{ py: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1,cursor: "pointer" }}>
            <Avatar src={`${domainName}/assets/${story.user.picturePath}`} sx={{ height: '60px', width: '60px' }} />
            <Box>
              <Typography fontWeight="500">{story.user.firstName + ' ' + story.user.lastName}</Typography>
              <TimeAgo timestamp={story.updatedAt}/>
            </Box>
          </Box>
        ))}
      </Paper>
      {/* SLIDER */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        <Box sx={{ height: '85vh', width: '350px', borderRadius: '20px', overflow: 'hidden' }}>
          <Slider ref={slider} {...settings}>
            {stories.map((story, index) => (
              <Box key={story._id} sx={{ position: 'relative', width: '100%', height: '85vh' }}>
                {story.source !== '' ? (
                  <CardMedia url={`${domainName}/assets/${story.source}`} controls={true} />
                ) : (
                  <Box
                    className={story.background}
                    sx={{
                      p: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '85vh',
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        textAlign: 'center',
                        color: '#fff',
                        wordBreak: 'break-word',
                      }}
                    >
                      {story.description}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    zIndex: '2',
                    top: '8px',
                    left: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    gap: 1,
                  }}
                >
                  <Avatar src={`${domainName}/assets/${story.user.picturePath}`} />
                  <Typography sx={{ color: '#fff' }}>{story.user.firstName + ' ' + story.user.lastName}</Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
        <Avatar
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: '50%',
            left: { lg: '25%', xs: '2%' },
            backgroundColor: 'background.main',
            boxShadow: '0 0 5px rgba(0,0,0,0.5)',
          }}
          onClick={() => {
            slider?.current?.slickPrev(1);
          }}
        >
          <KeyboardArrowLeftIcon color="text" />
        </Avatar>
        <Avatar
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: '50%',
            right: { lg: '25%', xs: '2%' },
            backgroundColor: 'background.main',
            boxShadow: '0 0 5px rgba(0,0,0,0.5)',
          }}
          onClick={() => slider?.current?.slickNext()}
        >
          <KeyboardArrowRightIcon color="text" />
        </Avatar>
      </Box>
    </Box>
  );
};

export default DisplayStory;
