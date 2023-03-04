import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

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
