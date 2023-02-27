import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    board: [
      [0, 1, 2, 3, 4],
      [1, 1, 2, 3, 4],
      [2, 1, 2, 3, 4],
      [3, 1, 2, 3, 4],
      [4, 1, 2, 3, 4],
    ],
  },
  reducers: {
    pushMsg: (state, action) => {
      state.value.push(action.payload);
    }
  },
});

export const { pushMsg } = gameSlice.actions;
export default gameSlice.reducer;
