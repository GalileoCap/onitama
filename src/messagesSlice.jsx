import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    value: [],
  },
  reducers: {
    pushMsg: (state, action) => {
      state.value.push(action.payload);
    }
  },
});

export const { pushMsg } = messagesSlice.actions;

export default messagesSlice.reducer;
