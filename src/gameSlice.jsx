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

      console.log(Math.floor((fromVal - 1) / 2), Math.floor((toVal - 1) / 2))
      if (Math.floor((fromVal - 1) / 2) !== Math.floor((toVal - 1) / 2)) {
        state.board[toRow][toCol] = fromVal;
        state.board[fromRow][fromCol] = 0;
      } //TODO: Else reject
      state.selectedCell = undefined;
    }
  },
});

export const { selectCell } = gameSlice.actions;
export default gameSlice.reducer;
