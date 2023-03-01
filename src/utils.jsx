import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export function transform({ row, col }) {
  const f = (x) => { //TODO: Smarter?
    switch (x) {
    case 0: return 4;
    case 1: return 3;
    case 2: return 2;
    case 3: return 1;
    case 4: return 0;
    }
  }

  return { row: f(row), col: f(col) };
}

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

export function useForceUpdate(key) {
  return useSelector((state) => state.utils.forceUpdate[key]);
}

export const { forceUpdate } = utils.actions;
export const utilsReducer = utils.reducer;
