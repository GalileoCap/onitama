import { configureStore } from '@reduxjs/toolkit';
import { gameReducer as OnitamaReducer } from './games/onitama/gameSlice';
import { gameReducer as TTTReducer } from './games/tiictaactooee/gameSlice';
import { chatReducer } from './components/Chat';
import { utilsReducer } from './utils';

export default configureStore({
  reducer: {
    game: OnitamaReducer,
    game2: TTTReducer,
    chat: chatReducer,
    utils: utilsReducer,
  },
});
