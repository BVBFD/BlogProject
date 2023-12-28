import { createSlice } from '@reduxjs/toolkit';

interface PostType {
  _id: string;
  __v: number;
  updatedAt: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  catName: string;
  author: string;
}

const initialState: PostType[] = [];

const postsVarSlice = createSlice({
  name: 'postsPage',
  initialState,
  reducers: {
    setPostsVar: (_state, action) => {
      return action.payload;
    },
  },
});

export type { PostType };
export const { setPostsVar } = postsVarSlice.actions;
export default postsVarSlice.reducer;
