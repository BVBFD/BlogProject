import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
const TEST_BASE_URL = `${process.env.NEXT_PUBLIC_TEST_BASE_URL}`;
const NEXT_API_BASE_URL = `${process.env.NEXT_PUBLIC_NEXT_API_BASE_URL}`;

let Origin = 'http://localhost:3000' || 'https://lsevina126.netlify.app';

export const publicRequest = axios.create({
  baseURL: TEST_BASE_URL,
  withCredentials: true,
  headers: {
    Origin,
    'Content-Securitiy-Policy':
      'img-src *;media-src https://res.cloudinary.com https://www.youtube.com/embed/;child-src https://res.cloudinary.com https://www.youtube.com/embed/;frame-src https://www.youtube.com/embed/;',
  },
});
