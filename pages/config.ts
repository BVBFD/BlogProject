import axios from 'axios';
import dynamic from 'next/dynamic';

const BASE_URL = 'https://api.lsevina126.asia';
// const USER = JSON.parse(localStorage?.getItem('persist:root') as string)?.user;
// const TOKEN = USER
//   ? JSON.parse(USER).currentUser?.accessToken?.toString()
//   : null;

let Origin = 'http://localhost:3000' || 'https://www.lsevina126.asia';

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
