import { getSwrUrl } from '@/api/config';
import { getPostsAndFiltered } from '@/api/postApi';
import { PostsType } from '@/models/postsModel';
import { setPaginationTotalNum } from '@/redux/paginationTotalNumSlice';
import { setPostsVar } from '@/redux/postsVarSlice';
import { setFalse } from '@/redux/searchTextBolSlice';
import { RootState } from '@/redux/sliceStore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SwrResponseType {
  data: {
    posts: PostsType[];
    totalPostsCount: number;
  };
  isLoading: boolean;
  error: Error;
}

const useInitPosts = () => {
  const { currentPageNum, searchText, catName } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [postsPerSize, setPostsPerSize] = useState<number>(4);
  const {
    data,
    isLoading,
    error: swrError,
  }: SwrResponseType = getPostsAndFiltered(currentPageNum, searchText, catName);
  const swrUrl = getSwrUrl({ currentPageNum, searchText, catName });

  useEffect(() => {
    setPostsPerSize(4);

    if (data) {
      const { posts, totalPostsCount } = data;
      dispatch(setPostsVar(posts));
      dispatch(setPaginationTotalNum(totalPostsCount));
    } else {
      dispatch(setPostsVar([]));
      dispatch(setFalse());
    }
  }, [data, isLoading, swrError, currentPageNum, searchText, catName]);

  return { postsPerSize, swrUrl, isLoading, swrError };
};

export default useInitPosts;
