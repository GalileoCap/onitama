import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    pushMsg: (state, action) => {
      state.messages.push(action.payload);
    }
  },
});

export const { pushMsg } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
