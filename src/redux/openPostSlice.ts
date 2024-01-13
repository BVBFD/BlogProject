import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openPostBol: false,
};

const openPostSlice = createSlice({
  name: 'openPostBol',
  initialState,
  reducers: {
    setOpenPostTrue: (state) => {
      state.openPostBol = true;
    },
    setOpenPostFalse: (state) => {
      state.openPostBol = false;
    },
  },
});

export const { setOpenPostTrue, setOpenPostFalse } = openPostSlice.actions;
export default openPostSlice.reducer;
