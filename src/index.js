import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersitStore, store } from './store/store';
import SocketProvider from './SocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersitStore>
      <SocketProvider>
        <App />
      </SocketProvider>
    </PersitStore>
  </Provider>,
);
