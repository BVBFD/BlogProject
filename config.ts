import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
// const TEST_BASE_URL = `${process.env.NEXT_PUBLIC_TEST_BASE_URL}`;
// const BASE_URL = 'http://localhost:8800';
// const USER = JSON.parse(localStorage?.getItem('persist:root') as string)?.user;
// const TOKEN = USER
//   ? JSON.parse(USER).currentUser?.accessToken?.toString()
//   : null;

let Origin =
  'http://localhost:3000' ||
  'https://www.lsevina126.asia' ||
  'https://lsevina126.netlify.app' ||
  'https://blog-project-rose.vercel.app';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Origin,
    'Content-Securitiy-Policy':
      'img-src *;media-src https://res.cloudinary.com https://www.youtube.com/embed/;child-src https://res.cloudinary.com https://www.youtube.com/embed/;frame-src https://www.youtube.com/embed/;',
  },
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     mode: 'cors',
//     token: `Bearer ${TOKEN}`,
//     origin: `http://${HOST}`,
//   },
// });
