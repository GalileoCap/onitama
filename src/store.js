import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice';
import { utilsReducer } from './utils';

export default configureStore({
  reducer: {
    messages: messagesReducer,
    utils: utilsReducer,
  },
});
