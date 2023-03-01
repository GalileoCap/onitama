import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './Game/gameSlice';
import chatReducer from './Chat/chatSlice';
import { utilsReducer } from './utils';

export default configureStore({
  reducer: {
    game: gameReducer,
    chat: chatReducer,
    utils: utilsReducer,
  },
});
