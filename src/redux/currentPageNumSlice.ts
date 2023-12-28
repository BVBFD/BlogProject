import { createSlice } from '@reduxjs/toolkit';

const initialState = 1;

const currentPageNumSlice = createSlice({
  name: 'currentPageNum',
  initialState,
  reducers: {
    setCurrentPage: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrentPage } = currentPageNumSlice.actions;
export default currentPageNumSlice.reducer;
