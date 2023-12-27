import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTextBol: false,
};

const searchTextSlice = createSlice({
  name: 'searchTextBol',
  initialState,
  reducers: {
    setTrue: (state) => {
      state.searchTextBol = true;
    },
    setFalse: (state) => {
      state.searchTextBol = false;
    },
  },
});

export const { setTrue, setFalse } = searchTextSlice.actions;
export default searchTextSlice.reducer;
