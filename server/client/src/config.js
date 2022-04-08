import axios from 'axios';
import axiosRetry from 'axios-retry';

const defaultRetryConfig = {
  retries: 5,
  retryDelay: 100,
};

const axiosInstance = axios.create(
  {
    baseURL: 'https://myportfolioblogproject.herokuapp.com/',
  },
  {
    mode: 'cors',
    credentials: 'include',
    headers: {
      // Origin: `https://res.cloudinary.com`,
      Origin: `http://localhost:3000`,
    },
  }
);

axiosRetry(axiosInstance, {
  retries: defaultRetryConfig.retries,
  retryDelay: (retry) => {
    const delay = Math.pow(2, retry) * defaultRetryConfig.retryDelay;
    const jitter = delay * 0.1 * Math.random();
    return delay + jitter;
  },
  retryCondition: (err) =>
    axiosRetry.isNetworkOrIdempotentRequestError(err) ||
    err.response.status === 429,
});

export default axiosInstance;
