import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './games/onitama/gameSlice'; //TODO
import { chatReducer } from './components/Chat';
import { utilsReducer } from './utils';

export default configureStore({
  reducer: {
    game: gameReducer,
    chat: chatReducer,
    utils: utilsReducer,
  },
});
