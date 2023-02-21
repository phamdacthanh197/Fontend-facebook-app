import { Box, Paper } from '@mui/material'
import React from 'react'


import ChatList from '~/components/ChatList'
import MessengerCard from '~/components/messenger/MessengerCard'

const MessengerPage = () => {
  return (
    <Box sx={{
      pt: 8,
      width: '100vw',
      height: "100vh",
      display: 'flex',
      // flexDirection: {md: "row", xs: 'column'},
      backgroundColor: 'background.main',
      overflow: "hidden",
    }}>
      <ChatList flex={1}/>
      <MessengerCard flex={2}/>
    </Box>
  )
}

export default MessengerPage