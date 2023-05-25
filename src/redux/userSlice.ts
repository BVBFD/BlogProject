import { createSlice } from '@reduxjs/toolkit';

type UserStateType = {
  [x: string]: string | boolean;
  id: string;
  editable: boolean;
  profilePic: string;
  email: string;
};

const initialState: UserStateType = {
  id: '',
  editable: false,
  profilePic: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReduce: (state, action) => {
      state.id = action.payload.userId;
      state.editable = action.payload.editable;
      state.email = action.payload.email;
      state.profilePic = action.payload.profilePic;
    },
    logoutReduce: (state) => {
      state.id = '';
      state.editable = false;
      state.email = '';
      state.profilePic = '';
    },
  },
});

export type { UserStateType };
export const { loginReduce, logoutReduce } = userSlice.actions;
export default userSlice.reducer;
