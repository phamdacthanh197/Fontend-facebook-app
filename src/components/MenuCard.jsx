import React from 'react';
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Paper,
  Button,
  Divider,
} from '@mui/material';
import { SearchOutlined} from '@mui/icons-material';
import { categories } from '~/assets/sidebar_img';
import { appMenuList } from '~/utils/constant';

const MenuCard = () => {
  return (
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
  );
};

export default MenuCard;
