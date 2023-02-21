import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  // PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import postReducer from './postSlice';
import authReducer from './authSlice';
import messengerReducer from './messengerSlice';
import storyReducer from './storySlice';
import alertReducer from './alertSlice';
import modalReducer from './modalSilce';
import notifyReducer from './notifySlice';
import userReducer from './userSlice';
import commentReducer from './commetSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  messenger: messengerReducer,
  story: storyReducer,
  alert: alertReducer,
  modal: modalReducer,
  notify: notifyReducer,
  user: userReducer,
  comment: commentReducer,
});
const rootPersistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // customize middlware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          // PURGE,
          REGISTER,
        ],
    }),
});

export const PersitStore = ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistStore(store)}>
      {children}
    </PersistGate>
  );
};
