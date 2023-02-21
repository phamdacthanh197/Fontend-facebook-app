import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import HomePage from '~/pages/homePage/HomePage';
import LoginPage from '~/pages/loginPage/LoginPage';
import ProfilePage from '~/pages/profilePage/ProfilePage';
import { themeSettings } from './theme';
import WatchPage from './pages/watchPage/WatchPage';
import NavBar from './pages/layout/NavBar';
import MarketPage from './pages/marketPage/MarketPage';
import GamePage from './pages/gamePage/GamePage';
import StoryPage from './pages/createStoryPage/StoryPage';
import DisplayStory from './pages/playStoryPage/DisplayStory';
import MessengerPage from './pages/messengerPage/MessengerPage';
import AlertCusttom from './components/Alert';
import SocketClient from './SocketClient';

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
        }
      });
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <NavBar />
          <CssBaseline />
          <AlertCusttom />
          {isAuth && <SocketClient />}
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
              <Route path="/watch" element={isAuth ? <WatchPage /> : <Navigate to="/" />} />
              <Route path="/market" element={isAuth ? <MarketPage /> : <Navigate to="/" />} />
              <Route path="/game" element={isAuth ? <GamePage /> : <Navigate to="/" />} />
              <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
              <Route path="/story/create" element={isAuth ? <StoryPage /> : <Navigate to="/" />} />
              <Route path="/story" element={isAuth ? <DisplayStory /> : <Navigate to="/" />} />
              <Route path="/messenger" element={isAuth ? <MessengerPage /> : <Navigate to="/" />} />
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
