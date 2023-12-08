import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
// 코드상단에 우선순위가 높은 순으로 필요한 컴포넌트 및 함수를 미리 import 시켜야 속도가 빨라짐
import { Spin } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from '@ant-design/icons';
import Head from 'next/head';
import Banner from '@/components/Banner';
import BasicPagination from '@/common/BasicPagination';
import BasicButton from '@/common/BasicButton';
import Posts from '../components/Posts';
import { publicRequest } from '../../config';
import styles from '../styles/Home.module.scss';

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

  const [bolImgShowUp, setBolImgShowUp] = useState<boolean>();
  const [pagination, setPagination] = useState<React.ReactNode | null>(null);
  const [showPagination, setShowPagination] = useState<boolean>(false);

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  // 만약 [searchText, catName]이 없다면 useCallback 같은 경우 한번 생성된 콜백함수를
  // 그대로 메모리에 저장해서 계속 쓰기 때문에 (새로 생성없이...) searchText, catName 이 바뀜에 따라,
  // 페이지네이션도 변해야 하는데 변하질 않게됨... why? 최초 생성된 콜백함수를 메모리에 저장해서 계속 써서
  // 성능최적화를 하기 때문... 그래서 외부 변수에 영향 받는 콜백 함수는 외부 변수를 array deps안에 다 써야한다.
  const goToPage = useCallback(
    async (pageNum: number) => {
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
    },
    [searchText, catName]
  );

  const getPosts = useCallback(async () => {
    setOnProgress(true);
    const res = await publicRequest.get(`/posts`);
    const { posts, totalPostsCount } = await res.data;
    setPostsVar(posts);
    setPaginationTotalNum(totalPostsCount);
    setPostsPerSize(4);
    setCurrentPage(1);

    return setOnProgress(false);
  }, []);

  useEffect(() => {
    getPosts();
    setShowPagination(true);

    return () => {
      setPagination(null);
      setShowPagination(false);
    };
  }, []);

  useMemo(() => pagination, [currentPage, paginationTotalNum, postsVar]);

  useMemo(() => showPagination, [currentPage, paginationTotalNum]);

  const handleTotal = useCallback(() => {
    setSearchText('');
    setCatName('');
    getPosts();
  }, [getPosts]);

  const handleSearch = useCallback(async (url: string) => {
    setOnProgress(true);
    const res = await publicRequest.get(url);
    const { posts, totalPostsCount } = await res.data;
    setPostsVar(posts);
    setPaginationTotalNum(totalPostsCount);
    setCurrentPage(1);
    setOnProgress(false);
  }, []);

  const handleKeywordSearch = async () => {
    if (searchText.trim() !== '') {
      handleSearch(`/posts?text=${searchText}`);
    }
  };

  const handleCatName = useCallback(async (e: React.MouseEvent<HTMLSpanElement>) => {
    setSearchText('');
    setCatName(e.currentTarget.innerText);
    handleSearch(`/posts?cat=${e.currentTarget.innerText}`);
  }, []);

  const handleSearchText = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value === '') {
      getPosts();
    }
  }, []);

  const getImgShowUp = useCallback((imgShowUp: boolean) => {
    setBolImgShowUp(imgShowUp);
  }, []);

  return (
    <div>
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
      <section className={styles.homeSec}>
        <div className={styles.container}>
          {onProgress ? (
            <div className={styles.circularProgress} style={{ flex: 3 }}>
              <div>
                <Spin />
              </div>
            </div>
          ) : (
            <Posts
              getImgShowUp={getImgShowUp}
              selectedPost={
                // slice가 Array.from 보다 더 빠름
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
      </section>
      {postsVar.length !== 0 && !onProgress && bolImgShowUp && showPagination && (
        <BasicPagination
          current={currentPage}
          defaultCurrent={1}
          onChange={(changePageNum) => goToPage(changePageNum)}
          pageSize={postsPerSize}
          total={paginationTotalNum}
        />
      )}
    </div>
  );
};

export default Home;
