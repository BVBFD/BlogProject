import useSWR from 'swr';
import { fetcher, getSwrUrl } from './config';

export const getPostsAndFiltered = (currentPageNum: number, searchText: string, catName: string) => {
  const swrUrl = getSwrUrl({ currentPageNum, searchText, catName });
  const response = useSWR(swrUrl, fetcher);
  return response;
};
