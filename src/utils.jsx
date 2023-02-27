import { createSlice } from '@reduxjs/toolkit';

export const utils = createSlice({
  name: 'utils',
  initialState: {
    forceUpdate: {},
  },
  reducers: {
    forceUpdate: (state, action) => {
      if (state.forceUpdate[action.payload] === undefined) state.forceUpdate[action.payload] = 0;
      else state.forceUpdate[action.payload]++;
    }
  },
});

export const { forceUpdate } = utils.actions;
export const utilsReducer = utils.reducer;
