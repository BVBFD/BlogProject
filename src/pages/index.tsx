import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Spin } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from '@ant-design/icons';

import Head from 'next/head';
import Banner from '@/components/Banner';
import BasicPagination from '@/common/BasicPagination';
import BasicButton from '@/common/BasicButton';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/sliceStore';

import { setFalse, setTrue } from '@/redux/searchTextBolSlice';
import { setPostsVar } from '@/redux/postsVarSlice';
import { setPaginationTotalNum } from '@/redux/paginationTotalNumSlice';
import { setCurrentPage } from '@/redux/currentPageNumSlice';
import { setSearchText } from '@/redux/searchTextStringSlice';
import { setCatName } from '@/redux/catNameSlice';

import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { publicRequest } from '../../config';
import Posts from '../components/Posts';

const Home = () => {
  const { postsVar, paginationTotalNum, currentPageNum, searchText, catName, postClientY, searchTextBol } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const scrollContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [onProgress, setOnProgress] = useState<boolean>(false);
  const [postsPerSize, setPostsPerSize] = useState<number>(4);

  const goToPage = useCallback(
    async (pageNum: number) => {
      let url = `/posts?page=${pageNum}`;

      if (searchText !== '') {
        url += `&text=${searchText}`;
      }

      if (catName !== '') {
        url += `&cat=${catName}`;
      }

      dispatch(setCurrentPage(pageNum));
      setOnProgress(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
        const { posts, totalPostsCount } = await res.json();

        dispatch(setPostsVar(posts));

        if (catName !== '') {
          dispatch(setPaginationTotalNum(totalPostsCount));
        }
      } catch (error) {
        setOnProgress(false);
      } finally {
        setOnProgress(false);
      }
    },
    [searchText, catName]
  );

  const getPosts = useCallback(async () => {
    setOnProgress(true);
    try {
      const res = await publicRequest.get(`/posts`);
      const { posts, totalPostsCount } = res.data;
      dispatch(setPostsVar(posts));
      dispatch(setPaginationTotalNum(totalPostsCount));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.alert(error.response.data.message);
    }
    setPostsPerSize(4);
    dispatch(setCurrentPage(1));
    setOnProgress(false);
  }, []);

  const handleTotal = useCallback(() => {
    dispatch(setFalse());
    dispatch(setPaginationTotalNum(0));
    dispatch(setSearchText(''));
    dispatch(setCatName(''));
    getPosts();
  }, []);

  const handleSearch = useCallback(
    async (url: string) => {
      setOnProgress(true);
      dispatch(setPaginationTotalNum(0));
      try {
        const res = await publicRequest.get(url);
        const { posts, totalPostsCount } = await res.data;
        dispatch(setPostsVar(posts));
        dispatch(setPaginationTotalNum(totalPostsCount));
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.alert(error.response.data.message);
        handleTotal();
      }
      dispatch(setCurrentPage(1));
      setOnProgress(false);
    },
    [dispatch]
  );

  const handleKeywordSearch = async () => {
    if (searchText.trim() !== '') {
      handleSearch(`/posts?text=${searchText}`);
      dispatch(setTrue());
    }
  };

  const handleCatName = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(setSearchText(''));
      dispatch(setCatName(e.currentTarget.innerText));
      handleSearch(`/posts?cat=${e.currentTarget.innerText}`);
    },
    [handleSearch]
  );

  const handleSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchText(e.target.value));
      if (e.target.value === '') {
        if (searchTextBol.searchTextBol) {
          handleTotal();
        }
      }
    },
    [searchTextBol, handleTotal]
  );

  useEffect(() => {
    if (postsVar.length === 0) {
      getPosts();
    }

    const goToPageAndScroll = async () => {
      await goToPage(currentPageNum);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 30);
      });
      window.scrollTo({ top: postClientY, behavior: 'auto' as ScrollBehavior });
    };

    goToPageAndScroll();

    const handleBeforeUnloadOnload = () => {
      localStorage.clear();
    };

    window.addEventListener('unload', handleBeforeUnloadOnload);
    return () => {
      window.removeEventListener('unload', handleBeforeUnloadOnload);
    };
  }, []);

  return (
    <div className={styles.homeIndexContainer} ref={scrollContainerRef}>
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
        {catName === '' && (
          <>
            <input
              className={styles.searchInput}
              onChange={handleSearchText}
              placeholder="Searching Posts..."
              ref={searchInputRef}
              type="text"
              value={searchText}
            />
            <BasicButton BasicButtonType="small" className={styles.totalBtn} onClick={handleKeywordSearch}>
              검색
            </BasicButton>
          </>
        )}
        {(searchText !== '' || catName !== '') && (
          <BasicButton BasicButtonType="small" className={styles.totalBtn} onClick={handleTotal}>
            전체 포스트 보기
          </BasicButton>
        )}
      </div>

      <section className={styles.homeSec}>
        <div className={styles.container}>
          {onProgress ? (
            <div className={styles.circularProgress} style={{ flex: 3 }}>
              <Spin />
            </div>
          ) : (
            <Posts
              selectedPost={
                postsVar.length === postsPerSize
                  ? postsVar.slice(0, postsPerSize)
                  : Array.from({ length: postsPerSize }, (_value, index) => postsVar[index])
              }
              setOnProgress={setOnProgress}
            />
          )}
          <div className={styles.sidebar}>
            <header>About Me</header>
            <div className={styles.imgBox}>
              <Image
                alt="blog-sidebar-image"
                fetchPriority="high"
                fill
                loading="eager"
                objectFit="cover"
                quality={100}
                src="/imgs/blog-image-5.jpg"
              />
            </div>
            <header className={styles.catHead}>
              <div>CATEGORIES</div>
            </header>
            <div className={styles.categoriesBox}>
              {['HTML / Git', 'CSS', 'JavaScript', 'Front-End', 'Back-End', 'Algorithm', 'Life', 'Book / Learn'].map(
                (category) => (
                  <button key={category} onClick={handleCatName} type="button">
                    {category}
                  </button>
                )
              )}
            </div>
            <footer>FOLLOW US</footer>
            <div className={styles.logoBox}>
              <FacebookFilled />
              <TwitterCircleFilled />
              <InstagramFilled />
            </div>
          </div>
        </div>
      </section>
      {paginationTotalNum !== 0 ? (
        <BasicPagination
          current={currentPageNum}
          defaultCurrent={1}
          onChange={(changePageNum) => goToPage(changePageNum)}
          pageSize={postsPerSize}
          total={paginationTotalNum}
        />
      ) : (
        <div style={{ height: '100px' }} />
      )}
    </div>
  );
};

export default Home;
