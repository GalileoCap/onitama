import { createSlice } from '@reduxjs/toolkit';

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
  },
  reducers: {
    selectCell: (state, action) => {
      if (state.selectedCell === undefined) {
        state.selectedCell = action.payload;
        return;
      } else if (state.selectedCell.row === action.payload.row && state.selectedCell.col === action.payload.col) {
        state.selectedCell = undefined;
        return;
      }

      const { row: fromRow, col: fromCol } = state.selectedCell;
      const { row: toRow, col: toCol } = action.payload;

      state.board[toRow][toCol] = state.board[fromRow][fromCol];
      state.board[fromRow][fromCol] = 0;
      state.selectedCell = undefined;
    }
  },
});

export const { selectCell } = gameSlice.actions;
export default gameSlice.reducer;
