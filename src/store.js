import { configureStore } from '@reduxjs/toolkit';
import { gameReducer as OnitamaReducer } from './games/onitama/gameSlice';
import { gameReducer as TTTReducer } from './games/tiictaactooee/gameSlice';
import { chatReducer } from './components/Chat';
import { utilsReducer } from './utils';

export default configureStore({
  reducer: {
    // Games
    Onitama: OnitamaReducer,
    TTT: TTTReducer,

    // Misc
    chat: chatReducer,
    utils: utilsReducer,
  },
});
