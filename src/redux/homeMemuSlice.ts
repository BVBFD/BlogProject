import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  home: false,
};

const homeMenuSlice = createSlice({
  name: 'homeMenu',
  initialState,
  reducers: {
    toggle: (state) => {
      state.home = !state.home;
    },
  },
});

export const { toggle } = homeMenuSlice.actions;
export default homeMenuSlice.reducer;
