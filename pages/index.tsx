import Head from 'next/head';
import Banner from '../components/Banner';
import Posts from '../components/Posts';
import styles from '../styles/Home.module.css';
// import Image from 'next/image';
import { Facebook, Pinterest, Twitter, Instagram } from '@mui/icons-material';
import { Pagination, CircularProgress, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { publicRequest } from '../config';

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

      const res = await publicRequest.get(`/posts`);
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
        {/* SEO */}
        <title>Blog Project</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Blog Project with React and NodeJS' />
        <meta
          property='og:title'
          content='Blog Project with React and NodeJS'
        />
        <meta property='og:url' content='https://lsevina126.netlify.app' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Blog Project for lsevina126' />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/dewa3t2gi/image/upload/v1674981291/qyeb9rvghfair1pkgqud.png'
        />
        <meta
          property='og:description'
          content='Blog Project for lsevina126 with React and NodeJS'
        />
        <link rel='canonical' href='https://lsevina126.netlify.app' />
        {/* SEO */}
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
            <img
              alt='sidebarImg'
              width={30}
              height={30}
              src='https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif'
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

// export const getServerSideProps = async () => {
//   const res = await publicRequest.get(`/posts`);

//   return {
//     props: {
//       posts: res.data.reverse(),
//     },
//   };
// };
