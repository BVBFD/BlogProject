import React, { useEffect, useRef, useState } from 'react';

import { Spin } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from '@ant-design/icons';

import Head from 'next/head';
import Banner from '@/components/Banner';
import BasicPagination from '@/common/BasicPagination';
import BasicButton from '@/common/BasicButton';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/sliceStore';
import { setPaginationTotalNum } from '@/redux/paginationTotalNumSlice';
import { setCurrentPage } from '@/redux/currentPageNumSlice';

import Image from 'next/image';
import useFilter from '@/hooks/useFilter';
import useGoToPageAndScroll from '@/hooks/useGoToPageAndScroll';
import usePosts from '@/hooks/usePosts';
import { categories } from '@/constants/categories';
import { runSwrMutate } from '@/api/config';
import Posts from '../components/Posts';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const { postsVar, paginationTotalNum, currentPageNum, searchText, catName } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const { handleTotal, handleCatName, handleSearchText } = useFilter();
  const { postsPerSize, swrUrl, isLoading, swrError } = usePosts();
  const { goToPageAndScroll } = useGoToPageAndScroll();

  const scrollContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [onProgress, setOnProgress] = useState<boolean>(false);

  useEffect(() => {
    runSwrMutate(swrUrl);
    setOnProgress(isLoading);
  }, [swrUrl, isLoading]);

  useEffect(() => {
    goToPageAndScroll();
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
          <input
            className={styles.searchInput}
            onChange={(e) => handleSearchText(e, swrError)}
            placeholder="Searching Posts..."
            ref={searchInputRef}
            type="text"
            value={searchText}
          />
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
              {categories.map((category) => (
                <button key={category} onClick={handleCatName} type="button">
                  {category}
                </button>
              ))}
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
      {!swrError && paginationTotalNum !== 0 ? (
        <BasicPagination
          current={currentPageNum}
          defaultCurrent={!swrError && !isLoading ? 1 : 0}
          onChange={(num) => {
            dispatch(setPaginationTotalNum(paginationTotalNum));
            dispatch(setCurrentPage(num));
          }}
          pageSize={postsPerSize}
          total={paginationTotalNum}
        />
      ) : (
        <div style={{ height: '100%' }} />
      )}
    </div>
  );
};

export default Home;
