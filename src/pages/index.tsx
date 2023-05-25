import Head from 'next/head';
import Banner from '@/components/Banner';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from '@ant-design/icons';

import BasicPagination from '@/common/BasicPagination';
import React, { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import BasicButton from '@/common/BasicButton';
import { publicRequest } from '../../config';
import styles from '../styles/Home.module.scss';
import Posts from '../components/Posts';

interface PostType {
  _id: string;
  __v: number;
  updatedAt: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  catName: string;
  author: string;
}

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(4);
  const [catPost, setCatPost] = useState<PostType[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostType[]>([]);
  const [catname, setCatname] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [paginationNum, setPaginationNum] = useState<number>(0);

  const [searchText, setSearchText] = useState<string>();
  const [searchPosts, setSearchPosts] = useState<PostType[]>([]);
  const [onProgress, setOnProgress] = useState<boolean>(false);

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const getPosts = async () => {
      setOnProgress(true);

      const res = await publicRequest.get(`/posts`);
      const ps = res.data.reverse();
      setPosts(ps);
      setPaginationNum(ps.length);
      setSelectedPost([ps[0], ps[1], ps[2], ps[3]]);

      return setOnProgress(false);
    };

    getPosts();
    setRowsPerPage(4);
  }, []);

  const handleTotal = () => {
    setCatPost([]);
    setCatname('');
    setPage(1);
    setPaginationNum(posts.length);
    setSearchText('');
    setSelectedPost([posts[0], posts[1], posts[2], posts[3]]);
    searchInputRef.current.value = '';
  };

  const goToPage = (pageNum: number) => {
    setPage(pageNum);

    const startIndex = (pageNum - 1) * rowsPerPage;
    const endIndex = pageNum * rowsPerPage;

    if (catname === '' && searchPosts.length === 0) {
      setSelectedPost(posts.slice(startIndex, endIndex));
    } else if (searchPosts.length !== 0) {
      setSelectedPost(searchPosts.slice(startIndex, endIndex));
    } else {
      setSelectedPost(catPost.slice(startIndex, endIndex));
    }
  };

  const handleCatName = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { innerText } = e.target as HTMLSpanElement;
    setCatname(innerText);
    const newArray = posts.filter((post) => post.catName === innerText);
    setCatPost(newArray);
    setPaginationNum(newArray.length);
    setSelectedPost([newArray[0], newArray[1], newArray[2], newArray[3]]);
    setPage(1);
  };

  useEffect(() => {
    let filtered = [];
    let postTitle = '';

    const handleFilteredCatname = () => {
      filtered = catPost.filter((post: PostType) => {
        postTitle = post.title.replace(/(\s*)/g, '').toLowerCase();
        return postTitle.includes(searchText as string);
      });
      setSearchPosts(filtered);
      setPaginationNum(filtered.length);
      setSelectedPost([filtered[0], filtered[1], filtered[2], filtered[3]]);
      setPage(1);
    };

    const handleFilteredNonCatname = () => {
      filtered = posts.filter((post: PostType) => {
        postTitle = post.title.replace(/(\s*)/g, '').toLowerCase();
        return postTitle.includes(searchText as string);
      });
      setSearchPosts(filtered);
      setPaginationNum(filtered.length);
      setSelectedPost([filtered[0], filtered[1], filtered[2], filtered[3]]);
      setPage(1);
    };

    if (searchText) {
      if (catname !== '') {
        handleFilteredCatname();
      } else {
        handleFilteredNonCatname();
      }
    } else if (catname !== '') {
      handleFilteredCatname();
    } else {
      handleTotal();
    }
  }, [searchText]);

  return (
    <>
      <Head>
        {/* SEO */}
        <title>Blog Project</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Blog Project with React and NodeJS" name="description" />
        <meta content="Blog Project with React and NodeJS" property="og:title" />
        <meta content="https://lsevina126.netlify.app" property="og:url" />
        <meta content="website" property="og:type" />
        <meta content="Blog Project for lsevina126" property="og:site_name" />
        <meta
          content="https://res.cloudinary.com/dewa3t2gi/image/upload/v1674981291/qyeb9rvghfair1pkgqud.png"
          property="og:image"
        />
        <meta content="Blog Project for lsevina126 with React and NodeJS" property="og:description" />
        <link href="https://lsevina126.netlify.app" rel="canonical" />
        {/* SEO */}
      </Head>
      <Banner />
      <div className={styles.totalSearchBox}>
        <BasicButton BasicButtonType="small" className={styles.totalBtn} onClick={handleTotal}>
          TOTAL
        </BasicButton>
        <input
          className={styles.searchInput}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Searching Posts..."
          ref={searchInputRef}
          type="text"
        />
      </div>
      <div className={styles.container}>
        {onProgress ? (
          <div className={styles.circularProgress} style={{ flex: 3 }}>
            <Spin />
          </div>
        ) : (
          <Posts selectedPost={selectedPost} />
        )}
        <div className={styles.sidebar}>
          <header>About Me</header>
          <div className={styles.imgBox}>
            <img
              alt="sidebarImg"
              height={30}
              src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              width={30}
            />
            <p>Front-End, Back-End, Web Developer</p>
            <p>Sharing My Value and Knowledge For Others</p>
          </div>
          <header className={styles.catHead}>CATEGORIES</header>
          <div className={styles.categoriesBox}>
            <button onClick={handleCatName} type="button">
              HTML / Git
            </button>
            <button onClick={handleCatName} type="button">
              CSS
            </button>
            <button onClick={handleCatName} type="button">
              JavaScript
            </button>
            <button onClick={handleCatName} type="button">
              Front-End
            </button>
            <button onClick={handleCatName} type="button">
              Back-End
            </button>
            <button onClick={handleCatName} type="button">
              TypeScript
            </button>
            <button onClick={handleCatName} type="button">
              Game
            </button>
            <button onClick={handleCatName} type="button">
              Book / Learn
            </button>
          </div>
          <footer>FOLLOW US</footer>
          <div className={styles.logoBox}>
            <FacebookFilled />
            <TwitterCircleFilled />
            <InstagramFilled />
          </div>
        </div>
      </div>
      {onProgress ? (
        <div />
      ) : (
        <BasicPagination
          current={page}
          defaultCurrent={1}
          onChange={(changePageNum) => goToPage(changePageNum)}
          pageSize={4}
          total={paginationNum}
        />
      )}
    </>
  );
};

export default Home;
