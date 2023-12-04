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
  const [postsVar, setPostsVar] = useState<PostType[]>([]);
  const [postsPerSize, setPostsPerSize] = useState<number>(4);
  const [paginationTotalNum, setPaginationTotalNum] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [onProgress, setOnProgress] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>('');
  const [catName, setCatName] = useState<string>('');

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const getPosts = async () => {
    setOnProgress(true);
    const res = await publicRequest.get(`/posts`);
    const { posts, totalPostsCount } = await res.data;
    setPostsVar(posts);
    setPaginationTotalNum(totalPostsCount);
    setPostsPerSize(4);
    setCurrentPage(1);

    return setOnProgress(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleTotal = () => {
    setSearchText('');
    setCatName('');
    getPosts();
  };

  const handleKeywordSearch = () => {
    const getPostsByKeyword = async () => {
      setOnProgress(true);
      const res = await publicRequest.get(`/posts?text=${searchText}`);
      const { posts, totalPostsCount } = await res.data;
      setPostsVar(posts);
      setPaginationTotalNum(totalPostsCount);
      setCurrentPage(1);

      return setOnProgress(false);
    };

    getPostsByKeyword();
  };

  const goToPage = async (pageNum: number) => {
    if (searchText !== '') {
      setCurrentPage(pageNum);
      setOnProgress(true);
      const res = await publicRequest.get(`/posts?page=${pageNum}&text=${searchText}`);
      const { posts } = await res.data;
      setPostsVar(posts);

      return setOnProgress(false);
    }
    if (catName !== '') {
      setCurrentPage(pageNum);
      setOnProgress(true);
      const res = await publicRequest.get(`/posts?page=${pageNum}&cat=${catName}`);
      const { posts, totalPostsCount } = await res.data;
      setPostsVar(posts);
      setPaginationTotalNum(totalPostsCount);

      return setOnProgress(false);
    }
    if (searchText !== '' && catName !== '') {
      setCurrentPage(pageNum);
      setOnProgress(true);
      const res = await publicRequest.get(`/posts?page=${pageNum}&cat=${catName}&text=${searchText}`);
      const { posts, totalPostsCount } = await res.data;
      setPostsVar(posts);
      setPaginationTotalNum(totalPostsCount);

      return setOnProgress(false);
    }
    setCurrentPage(pageNum);
    setOnProgress(true);
    const res = await publicRequest.get(`/posts?page=${pageNum}`);
    const { posts } = await res.data;
    setPostsVar(posts);

    return setOnProgress(false);
  };

  const handleCatName = (e: React.MouseEvent<HTMLSpanElement>) => {
    setSearchText('');
    setCatName(e.currentTarget.innerText);
    const getPostsByCatName = async () => {
      setOnProgress(true);
      const res = await publicRequest.get(`/posts?cat=${e.currentTarget.innerText}`);
      const { posts, totalPostsCount } = await res.data;
      setPostsVar(posts);
      setPaginationTotalNum(totalPostsCount);
      setCurrentPage(1);

      return setOnProgress(false);
    };

    getPostsByCatName();
  };

  const handleSearchText = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value === '') {
      getPosts();
    }
  };

  return (
    <section className={styles.homeSec}>
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
        {searchText !== '' ||
          (catName !== '' && (
            <BasicButton BasicButtonType="small" className={styles.totalBtn} onClick={handleTotal}>
              SEE TOTAL POSTS (전체 포스트 보기)
            </BasicButton>
          ))}
        {catName === '' && (
          <input
            className={styles.searchInput}
            onChange={handleSearchText}
            // onChange={(e) => setSearchText(e.target.value)}
            placeholder="Searching Posts..."
            ref={searchInputRef}
            type="text"
            value={searchText}
          />
        )}
        {searchText !== '' && (
          <BasicButton BasicButtonType="small" className={styles.totalBtn} onClick={handleKeywordSearch}>
            Keyword Search (키워드 검색)
          </BasicButton>
        )}

        {searchText !== '' && (
          <BasicButton BasicButtonType="small" className={styles.totalBtn} onClick={handleTotal}>
            SEE TOTAL POSTS (전체 포스트 보기)
          </BasicButton>
        )}
      </div>
      <div className={styles.container}>
        {onProgress ? (
          <div className={styles.circularProgress} style={{ flex: 3 }}>
            <Spin />
          </div>
        ) : (
          <Posts
            selectedPost={Array.from({ length: postsPerSize }, (_value, index) => postsVar[index])}
            setOnProgress={setOnProgress}
            onProgress={onProgress}
          />
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
          <header className={styles.catHead}>
            <div>CATEGORIES</div>
          </header>
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
              Life
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
      {postsVar?.length !== 0 && !onProgress && (
        <BasicPagination
          current={currentPage}
          defaultCurrent={1}
          onChange={(changePageNum) => goToPage(changePageNum)}
          pageSize={postsPerSize}
          total={paginationTotalNum}
        />
      )}
    </section>
  );
};

export default Home;
