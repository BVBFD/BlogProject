import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const catNameSlice = createSlice({
  name: 'catName',
  initialState,
  reducers: {
    setCatName: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setCatName } = catNameSlice.actions;
export default catNameSlice.reducer;
