import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const postClientYSlice = createSlice({
  name: 'postClientY',
  initialState,
  reducers: {
    setPostClientY: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setPostClientY } = postClientYSlice.actions;
export default postClientYSlice.reducer;
