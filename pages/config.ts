import axios from 'axios';
import dynamic from 'next/dynamic';

const BASE_URL = 'https://api.lsevina126.asia';
// const USER = JSON.parse(localStorage?.getItem('persist:root') as string)?.user;
// const TOKEN = USER
//   ? JSON.parse(USER).currentUser?.accessToken?.toString()
//   : null;

let origin = 'http://localhost:3000' || 'https://www.lsevina126.asia';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    mode: 'cors',
    origin,
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
