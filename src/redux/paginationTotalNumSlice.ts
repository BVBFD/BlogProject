import { createSlice } from '@reduxjs/toolkit';

const initialState = 1;

const paginationTotalNumSlice = createSlice({
  name: 'paginationTotalNum',
  initialState,
  reducers: {
    setPaginationTotalNum: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setPaginationTotalNum } = paginationTotalNumSlice.actions;
export default paginationTotalNumSlice.reducer;
