import { createSlice } from '@reduxjs/toolkit';
import store from '../../store';
import { send2Conn } from '../../peer';

export const MINE = 0; export const THEIRS = 1;

function isEmpty(board, cell) {
  return board[cell.row][cell.col] === null;
}

function notifyMove(turn) { //TODO: Repeated code
  if (turn === THEIRS && document.hidden && Notification.permission === 'granted') {
    const notif = new Notification('They moved!');
  }
}

function performMove({ cell }, state) {
  state.board[cell.row][cell.col] = state.turn;

  notifyMove(state.turn);
  state.turn = (state.turn + 1) % 2;
}

export function getMetadata() { //TODO: 
  const rolls = {mine: Math.random(), theirs: Math.random()};

  return {rolls};
}

export function gameMsg(data) {
  store.dispatch(theirMove(data));
}

export const gameSlice = createSlice({
  name: 'game2',
  initialState: {
    turn: undefined,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
  },
  reducers: {
    initGame: (state, action) => {
      const { rolls, useMine } = action.payload;
      if (useMine) {
        state.turn = (rolls.mine > rolls.theirs) ? MINE : THEIRS;
      } else {
        state.turn = (rolls.mine > rolls.theirs) ? THEIRS : MINE;
      }
    },

    selectCell: (state, action) => {
      const { cell } = action.payload;

      if (state.turn !== MINE || !isEmpty(state.board, cell)) return;
      send2Conn({type: 'game', cell});
      performMove({ cell }, state);
    },
    
    theirMove: (state, action) => {
      if (state.turn !== THEIRS) return;

      //TODO: Check valid move

      const { cell } = action.payload;
      performMove({ cell }, state);
    }
  },
});

export const { initGame, selectCell, theirMove } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
