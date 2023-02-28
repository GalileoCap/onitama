import { createSlice } from '@reduxjs/toolkit';

export const MINE = 0; export const THEIRS = 1;

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    board: [
      [1, 1, 2, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [3, 3, 4, 3, 3],
    ],
    selectedCell: undefined,
    turn: undefined,
  },
  reducers: {
    setOrder: (state, action) => {
      const { mine, theirs } = action.payload;
      state.turn = (mine > theirs) ? MINE : THEIRS;
    },

    selectCell: (state, action) => {
      if (state.selectedCell === undefined) {
        const { row, col } = action.payload;
        if (state.board[row][col] !== 0)
          state.selectedCell = action.payload;
        //TODO: else reject
        return;
      } else if (state.selectedCell.row === action.payload.row && state.selectedCell.col === action.payload.col) {
        state.selectedCell = undefined;
        return;
      }

      const { row: fromRow, col: fromCol } = state.selectedCell;
      const { row: toRow, col: toCol } = action.payload;

      const fromVal = state.board[fromRow][fromCol];
      const toVal = state.board[toRow][toCol];

      if (Math.floor((fromVal - 1) / 2) !== Math.floor((toVal - 1) / 2)) {
        state.board[toRow][toCol] = fromVal;
        state.board[fromRow][fromCol] = 0;
        state.turn = (state.turn + 1) % 2;
      } //TODO: Else reject
      state.selectedCell = undefined;
    }
  },
});

export const { setOrder, selectCell } = gameSlice.actions;
export default gameSlice.reducer;
