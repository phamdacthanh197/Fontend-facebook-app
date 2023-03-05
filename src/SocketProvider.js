import React from 'react';
import { createContext } from 'react';
import { io } from 'socket.io-client';

// https://facebook-app.herokuapp.com/
export const socketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = io('https://facebook-app.herokuapp.com');
  return <socketContext.Provider value={socket}>{children}</socketContext.Provider>;
};

export default SocketProvider;
