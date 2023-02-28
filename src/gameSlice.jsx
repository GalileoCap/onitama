import { createSlice } from '@reduxjs/toolkit';
import { Conn } from './peer';

export const MINE = 0; export const THEIRS = 1;

function isMine(from, board) {
  return board[from.row][from.col] !== 0; //TODO: Assing a side to each player
}

function canMove(from, to, move, board) {
  return true; //TODO: Check not same team and move allows it
}

function transform({ row, col }) {
  return { row, col }; //TODO: Transform
}

function performMove(from, to, state) {
  state.board[to.row][to.col] = state.board[from.row][from.col];
  state.board[from.row][from.col] = 0;
  state.turn = (state.turn + 1) % 2;
  state.cell = undefined;
  state.move = undefined;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    turn: undefined,
    cell: undefined,
    move: undefined,
    board: [
      [1, 1, 2, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [3, 3, 4, 3, 3],
    ],
  },
  reducers: {
    setOrder: (state, action) => {
      const { mine, theirs } = action.payload;
      state.turn = (mine > theirs) ? MINE : THEIRS;
    },

    selectMove: (state, action) => {
      if (state.turn !== MINE) return;
      state.move = action.payload;
    },

    selectCell: (state, action) => {
      if (state.turn !== MINE) return;

      const from = state.cell
      const to = action.payload;

      if (from === undefined && isMine(to, state.board)) { // Choose a piece
        state.cell = to;
      } else if (state.move !== undefined && canMove(from, to, state.move, state.board)) { // Move
        performMove(from, to, state);
        Conn.send({type: 'move', from, to});
      } else { // De-select
        state.cell = undefined;
      }
    },
    
    theirMove: (state, action) => {
      if (state.turn !== THEIRS) return;

      //TODO: Check valid move

      const { from, to } = action.payload;
      performMove(transform(from), transform(to), state);
    }
  },
});

export const { setOrder, selectCell, selectMove, theirMove } = gameSlice.actions;
export default gameSlice.reducer;
