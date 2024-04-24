import axios from 'axios';
import { mutate } from 'swr';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
// const TEST_BASE_URL = `${process.env.NEXT_PUBLIC_TEST_BASE_URL}`;
// const NEXT_API_BASE_URL = `${process.env.NEXT_PUBLIC_NEXT_API_BASE_URL}`;
const DEFAULT_TIMEOUT = 30000;
const Origin = 'http://localhost:3000' || 'https://lsevina126.netlify.app';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    Origin,
    'Content-Type': 'application/json',
    'Content-Securitiy-Policy':
      'img-src *;media-src https://res.cloudinary.com https://www.youtube.com/embed/;child-src https://res.cloudinary.com https://www.youtube.com/embed/;frame-src https://www.youtube.com/embed/;',
  },
});

interface SwrUrlType {
  currentPageNum?: number;
  searchText?: string;
  catName?: string;
  postId?: string | string[];
}

export const getSwrUrl = ({ currentPageNum, searchText, catName, postId }: SwrUrlType) => {
  if (postId) {
    return `${BASE_URL}/posts/${postId}`;
  }
  return `${BASE_URL}/posts?${currentPageNum && `page=${currentPageNum}`}${searchText && `&text=${searchText}`}${
    catName && `&cat=${catName}`
  }`;
};

export const fetcher = (url: string) => publicRequest.get(url).then((res) => res.data);

export const runSwrMutate = (swrUrl: string) => {
  return mutate(swrUrl);
};
