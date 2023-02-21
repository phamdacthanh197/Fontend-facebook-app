import React from 'react';
import { Box, Typography, Avatar, Paper, Button, Divider, IconButton } from '@mui/material';
import FlexBetween from '~/components/FlexBetween';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from "~/store/authSlice"
import { useNavigate } from 'react-router-dom';
import { logout } from '~/store/actions/logOutAction';
import { URL } from '~/utils/fetchData';

const AcountPopover = ({ data: { data, icon, text }, setHistory, handleClloseAcount }) => {
  const { auth: { user }} = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleClick = (item) => {
    if(item.text === "Display & accesibility") {
      dispatch(setMode())
    }
    if(item.text == "Logout") {
      dispatch(logout())
      handleClloseAcount()
      navigate("/")
    }
  };
  const isChildren = !!icon;
  const isSmallSister = text === "Help & support"
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: 'background.main',
        height: isSmallSister ? "280px" : '450px',
        width: '360px', 
      }}
    >
      { !isChildren ? (
        <Paper elevation={4} sx={{ widht: '100%', height: '112px', mb: 2 }}>
          <Box onClick={() => {navigate("/profile");handleClloseAcount()}} sx={{ display: 'flex', alignItems: 'center', px: 1, py: 2, cursor: "pointer" }}>
            <Avatar src={`${URL}/assets/${user.picturePath}`} />
            <Typography sx={{ ml: 1 }} variant="h5" fontWeight="bold">
              {user.firstName + " " + user.lastName}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Button sx={{ textTransform: 'none', fontSize: '15px' }}>See all The </Button>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", p: 1}}>
          <IconButton onClick={() => setHistory((prev) => prev.slice(0, prev.length - 1))} sx={{ color: "text.main", height: "36px", width: "36px"}}>
            {icon}
          </IconButton>
          <Typography ml={1} variant='h3' fontWeight="bold">
            {text}
          </Typography>
        </Box>
      )}
      <Box>
        {data.map((item, index) => (
          <Button
            size="large"
            key={index + item.text}
            fullWidth
            onClick={() => {
              if (item.children) {
                setHistory((prev) => [...prev, item.children]);
              } else {
                return handleClick(item)
              }
            }}
            sx={{
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <FlexBetween>
                <Avatar
                  sx={{
                    backgroundColor: 'background.submain',
                    color: 'text.main',
                    height: '36px',
                    width: '36px',
                    marginRight: '8px',
                    fontSize: "20px"
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography variant="h6" color="text.main" fontSize="bold">
                  {item.text}
                </Typography>
              </FlexBetween>
              <Box
                sx={{
                  height: '30px',
                  width: '30px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {item.subicon}
              </Box>
            </Box>
          </Button>
        ))}
      </Box>
      <Divider />
      <Typography pt={1} textAlign="center">Meta @ 2023</Typography>
    </Box>
  );
};

export default AcountPopover;
