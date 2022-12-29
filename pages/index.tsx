import Head from 'next/head';
import Banner from '../components/Banner';
import Posts from '../components/Posts';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Facebook, Pinterest, Twitter, Instagram } from '@mui/icons-material';
import { Pagination, CircularProgress, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState<number>();
  const [catPost, setCatPost] = useState<any>([]);
  const [selectedPost, setSelectedPost] = useState<any>([]);
  const [catname, setCatname] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [searchText, setSearchText] = useState<string>();
  const [searchPosts, setSearchPosts] = useState<any>([]);
  const [onProgress, setOnProgress] = useState<boolean>(false);

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const getPosts = async () => {
      setOnProgress(true);
      const res = await axios.get(`https://api.lsevina126.asia/posts`);
      const ps = res.data.reverse();

      setPosts(ps);
      setCount(Math.ceil(ps?.length / 4));
      setSelectedPost([ps[0], ps[1], ps[2], ps[3]]);

      return setOnProgress(false);
    };

    getPosts();
  }, []);

  const handleTotal = () => {
    setCatPost([]);
    setCatname('');
    setPage(1);
    setCount(Math.ceil(posts.length / 4));
    setSelectedPost([posts[0], posts[1], posts[2], posts[3]]);
    searchInputRef.current.value = '';
  };

  const handleChange = (e: any, page: number) => {
    setPage(page);
    if (catname == '') {
      setSelectedPost([
        posts[(page - 1) * 4],
        posts[(page - 1) * 4 + 1],
        posts[(page - 1) * 4 + 2],
        posts[(page - 1) * 4 + 3],
      ]);
    } else {
      setSelectedPost([
        catPost[(page - 1) * 4],
        catPost[(page - 1) * 4 + 1],
        catPost[(page - 1) * 4 + 2],
        catPost[(page - 1) * 4 + 3],
      ]);
    }
  };

  const handleCatName = (e: any) => {
    setCatname(e.target.innerText);
    const newArray = posts.filter(
      // @ts-ignore
      (post) => post.catName === e.target.innerText
    );
    setCatPost(newArray);
    setCount(Math.ceil(newArray.length / 4));
    setSelectedPost([newArray[0], newArray[1], newArray[2], newArray[3]]);
    setPage(1);
  };

  useEffect(() => {
    let filtered = [];
    let postTitle = '';
    if (searchText == null) {
      return;
    } else {
      if (catname != '') {
        filtered = catPost.filter((post: any) => {
          postTitle = post.title.replace(/(\s*)/g, '').toLowerCase();
          return postTitle.includes(searchText);
        });
        setSearchPosts(filtered);
        setCount(Math.ceil(filtered.length / 4));
        setSelectedPost([filtered[0], filtered[1], filtered[2], filtered[3]]);
        setPage(1);
      } else {
        filtered = posts.filter((post: any) => {
          postTitle = post.title.replace(/(\s*)/g, '').toLowerCase();
          return postTitle.includes(searchText);
        });
        setSearchPosts(filtered);
        setCount(Math.ceil(filtered.length / 4));
        setSelectedPost([filtered[0], filtered[1], filtered[2], filtered[3]]);
        setPage(1);
      }
    }
  }, [searchText]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />

        <link
          rel='stylesheet'
          href='https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css'
        />
        <script
          src='https://unpkg.com/react@16/umd/react.development.js'
          // @ts-ignore
          crossorigin
        ></script>
        <script
          src='https://unpkg.com/react-dom@16/umd/react-dom.development.js'
          // @ts-ignore
          crossorigin
        ></script>
        <script src='https://unpkg.com/react-quill@1.3.3/dist/react-quill.js'></script>
        <script src='https://unpkg.com/babel-standalone@6/babel.min.js'></script>
        <script type='text/babel' src='/my-scripts.js'></script>
      </Head>
      <Banner />
      <div className={styles.totalSearchBox}>
        <button className={styles.totalBtn} onClick={handleTotal}>
          TOTAL
        </button>
        <input
          className={styles.searchInput}
          ref={searchInputRef}
          type='text'
          placeholder='Searching Posts...'
          onChange={(e: any) => setSearchText(e.target.value)}
        />
      </div>
      <div className={styles.container}>
        {onProgress ? (
          <div className={styles.circularProgress} style={{ flex: 3 }}>
            <CircularProgress />
          </div>
        ) : (
          <Posts selectedPost={selectedPost} />
        )}
        <div className={styles.sidebar}>
          <header>About Me</header>
          <div className={styles.imgBox}>
            <Image
              alt='sidebarImg'
              width={30}
              height={30}
              src={'/imgs/charina.gif'}
            />
            <p>Front-End, Back-End, Web Developer</p>
            <p>Sharing My Value and Knowledge For Others</p>
          </div>
          <header className={styles.catHead}>CATEGORIES</header>
          <div className={styles.categoriesBox}>
            <span onClick={handleCatName}>HTML / Git</span>
            <span onClick={handleCatName}>CSS</span>
            <span onClick={handleCatName}>JavaScript</span>
            <span onClick={handleCatName}>Front-End</span>
            <span onClick={handleCatName}>Back-End</span>
            <span onClick={handleCatName}>TypeScript</span>
            <span onClick={handleCatName}>Game</span>
            <span onClick={handleCatName}>Book / Learn</span>
          </div>
          <footer>FOLLOW US</footer>
          <div className={styles.logoBox}>
            <Facebook />
            <Twitter />
            <Pinterest />
            <Instagram />
          </div>
        </div>
      </div>
      <Stack
        spacing={2}
        direction='row'
        justifyContent={'center'}
        marginBottom={'1rem'}
      >
        <Pagination
          page={page}
          count={count}
          color='primary'
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default Home;

// 서버사이드 렌더링
// 아래 서버 API 데이터 호출이 완료되고, 페이지가 뜬다.
// (NEXTJS 서버사이드 렌더링 -> 비효츌적이라 바꿈)
// export const getServerSideProps = async () => {
//   const res = await axios.get(`https://api.lsevina126.asia/posts`);
//   return {
//     props: {
//       ps: res.data.reverse(),
//     },
//   };
// };