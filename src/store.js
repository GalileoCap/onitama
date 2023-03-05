import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './games/onitama/gameSlice'; //TODO
import { gameReducer as TTTReducer } from './games/tiictaactooee/gameSlice';
import { chatReducer } from './components/Chat';
import { utilsReducer } from './utils';

export default configureStore({
  reducer: {
    game: gameReducer,
    game2: TTTReducer,
    chat: chatReducer,
    utils: utilsReducer,
  },
});
