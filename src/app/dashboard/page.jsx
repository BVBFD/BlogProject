'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './page.module.css';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const session = useSession();

  console.log(session);

  const fetcher = (...args) =>
    fetch(...args)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .catch((err) => {
        throw err;
      });

  const { data, error, isLoading } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
  //       cache: 'no-store',
  //     });

  //     if (!res.ok) {
  //       setErr(true);
  //     }

  //     const data = await res.json();

  //     setData(data);
  //     setIsLoading(false);
  //   };

  //   getData();
  // }, []);

  return <div className={styles.container}>Dashboard</div>;
};

export default Dashboard;
