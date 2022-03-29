import axios from 'axios';

export const axiosInstance = axios.create(
  {
    baseURL: 'https://myportfolioblogproject.herokuapp.com/',
  },
  {
    mode: 'cors',
    credentials: 'include',
    headers: { Origin: `https://res.cloudinary.com` },
  }
);
