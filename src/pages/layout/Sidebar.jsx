import React, { useState, memo } from 'react';
import { Avatar, Typography, useMediaQuery } from '@mui/material';
import { categories } from '~/assets/sidebar_img';
import { Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { domainName } from '~/utils/fetchData';


const SideBar = () => {
  console.log("sidebar")
  // const { auth: { user }} = useSelector(state => state)
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate();
  const isDeskTopScreen = useMediaQuery('(min-width:1100px)');
  const [seeLess, setSeeLess] = useState(true);
  const isSeeLess = seeLess;
  const handleSeeless = () => {
    setSeeLess(!seeLess);
  };
  return (
    <>
      {isDeskTopScreen && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            px: '8px',
            display: 'flex',
            width: { xl: '280px', lg: '280px' },
            overflow: 'auto',
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={() => navigate("/profile")}
            sx={{
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Avatar
              src={`${domainName}/assets/${user.picturePath}`}
              sx={{
                height: '28px',
                width: '28px',
                marginRight: '8px',
              }}
            />
            <Typography variant="h6" color="text.main" fontSize="bold">
              {user.firstName + " " + user.lastName}
            </Typography>
          </Button>
          {isSeeLess
            ? categories.slice(0, 9).map((category) => (
                <Button
                  sx={{
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                  key={category.text}
                >
                  <span>
                    <img
                      style={{ height: '28px', width: '28px', marginRight: '8px' }}
                      src={category.img}
                      alt={`${categories.text} images`}
                    />
                  </span>
                  <Typography variant="h6" color="text.main" fontSize="bold">
                    {category.text}
                  </Typography>
                </Button>
              ))
            : categories.map((category) => (
                <Button
                  sx={{
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                  key={category.text}
                >
                  <span>
                    <img
                      style={{ height: '28px', width: '28px', marginRight: '8px' }}
                      src={category.img}
                      alt={`${categories.text} images`}
                    />
                  </span>
                  <Typography variant="h6" color="text.main" fontSize="bold">
                    {category.text}
                  </Typography>
                </Button>
              ))}
          {seeLess && (
            <Button
              onClick={handleSeeless}
              sx={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <span style={{ textAlign: 'center' }}>
                <KeyboardArrowUpIcon sx={{ fontSize: '28px' }} />
              </span>
              <Typography variant="h6" color="text.main" fontSize="bold">
                See less
              </Typography>
            </Button>
          )}
          {!seeLess && (
            <Button
              onClick={handleSeeless}
              sx={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <span style={{ textAlign: 'center' }}>
                <KeyboardArrowDownIcon sx={{ fontSize: '28px' }} />
              </span>
              <Typography variant="h6" color="text.main" fontSize="bold">
                See more
              </Typography>
            </Button>
          )}
          <Box width="100%" mt={2}>
            <Divider variant="middle" />
            <Typography
              sx={{
                py: 2,
                textAlign: 'center',
              }}
            >
              Meta @ 2023
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default memo(SideBar);
