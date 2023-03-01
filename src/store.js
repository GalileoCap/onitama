import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './Game/gameSlice';
import messagesReducer from './messagesSlice';
import { utilsReducer } from './utils';

export default configureStore({
  reducer: {
    game: gameReducer,
    messages: messagesReducer,
    utils: utilsReducer,
  },
});
