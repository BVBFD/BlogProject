import React, { useCallback, useEffect, useRef, useState } from 'react';
// 코드상단에 우선순위가 높은 순으로 필요한 컴포넌트 및 함수를 미리 import 시켜야 속도가 빨라짐
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
import { setPostClientY } from '@/redux/postClientYSlice';
import styles from '../styles/Home.module.scss';
import { publicRequest } from '../../config';
import Posts from '../components/Posts';

const Home = () => {
  // 포스트를 보고 그 해당 포스트 목파 페이지네이션으로 돌아가게끔 하기 위해 redux안에 넣음
  const { postsVar, paginationTotalNum, currentPageNum, searchText, catName, postClientY } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const [renderPosts, setRenderPosts] = useState<React.ReactNode>();
  const [renderSidebar, setRenderSidebar] = useState<React.ReactNode>();
  const scrollContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [postsPerSize, setPostsPerSize] = useState<number>(4);
  const [onProgress, setOnProgress] = useState<boolean>(false);

  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { searchTextBol } = useSelector((state: RootState) => state.searchTextBol);
  // 만약 [searchText, catName]이 없다면 useCallback 같은 경우 한번 생성된 콜백함수를
  // 그대로 메모리에 저장해서 계속 쓰기 때문에 (새로 생성없이...) searchText, catName 이 바뀜에 따라,
  // 페이지네이션도 변해야 하는데 변하질 않게됨... why? 최초 생성된 콜백함수를 메모리에 저장해서 계속 써서
  // 성능최적화를 하기 때문... 그래서 외부 변수에 영향 받는 콜백 함수는 외부 변수를 array deps안에 다 써야한다.
  const goToPage = useCallback(
    async (pageNum: number) => {
      if (searchText !== '') {
        dispatch(setCurrentPage(pageNum));
        setOnProgress(true);
        const res = await publicRequest.get(`/posts?page=${pageNum}&text=${searchText}`);
        const { posts } = await res.data;
        dispatch(setPostsVar(posts));

        return setOnProgress(false);
      }
      if (catName !== '') {
        dispatch(setCurrentPage(pageNum));
        setOnProgress(true);
        const res = await publicRequest.get(`/posts?page=${pageNum}&cat=${catName}`);
        const { posts, totalPostsCount } = await res.data;
        dispatch(setPostsVar(posts));
        dispatch(setPaginationTotalNum(totalPostsCount));

        return setOnProgress(false);
      }
      if (searchText !== '' && catName !== '') {
        dispatch(setCurrentPage(pageNum));
        setOnProgress(true);
        const res = await publicRequest.get(`/posts?page=${pageNum}&cat=${catName}&text=${searchText}`);
        const { posts, totalPostsCount } = await res.data;
        dispatch(setPostsVar(posts));
        dispatch(setPaginationTotalNum(totalPostsCount));

        return setOnProgress(false);
      }
      dispatch(setCurrentPage(pageNum));
      setOnProgress(true);
      const res = await publicRequest.get(`/posts?page=${pageNum}`);
      const { posts } = await res.data;
      dispatch(setPostsVar(posts));

      return setOnProgress(false);
    },
    [searchText, catName]
  );

  const getPosts = useCallback(async () => {
    setOnProgress(true);
    const res = await publicRequest.get(`/posts`);
    const { posts, totalPostsCount } = res.data;
    dispatch(setPostsVar(posts));
    dispatch(setPaginationTotalNum(totalPostsCount));
    setPostsPerSize(4);
    dispatch(setCurrentPage(1));

    return setOnProgress(false);
  }, []);

  const handleTotal = useCallback(() => {
    dispatch(setFalse());
    dispatch(setPaginationTotalNum(0));
    dispatch(setSearchText(''));
    dispatch(setCatName(''));
    getPosts();
  }, []);

  const handleSearch = useCallback(async (url: string) => {
    setOnProgress(true);
    dispatch(setPaginationTotalNum(0));
    const res = await publicRequest.get(url);
    const { posts, totalPostsCount } = await res.data;
    dispatch(setPostsVar(posts));
    dispatch(setPaginationTotalNum(totalPostsCount));
    dispatch(setCurrentPage(1));
    setOnProgress(false);
  }, []);

  const handleKeywordSearch = async () => {
    if (searchText.trim() !== '') {
      handleSearch(`/posts?text=${searchText}`);
    }
    dispatch(setTrue());
  };

  const handleCatName = useCallback(async (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch(setSearchText(''));
    dispatch(setCatName(e.currentTarget.innerText));
    handleSearch(`/posts?cat=${e.currentTarget.innerText}`);
  }, []);

  const handleSearchText = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchText(e.target.value));
      if (e.target.value === '') {
        if (searchTextBol) {
          handleTotal();
        }
      }
    },
    // useCallback으로 감싼 함수 내에서 참조하는 searchTextBol은 해당 함수가 최초로 생성될 때의 값으로 고정됩니다.
    // 이걸 몰라서 자꾸 에러가 생겼음
    [searchTextBol, handleTotal]
  );

  useEffect(() => {
    // redux 전역 데이터 관리를 쓰다보니 hydraion 에러가 나서 부득이하게 이렇게 하였음
    setRenderPosts(
      <Posts
        selectedPost={
          // slice가 Array.from 보다 더 빠름
          postsVar.length === postsPerSize
            ? postsVar.slice(0, postsPerSize)
            : Array.from({ length: postsPerSize }, (_value, index) => postsVar[index])
        }
        setOnProgress={setOnProgress}
      />
    );

    const handleBeforeUnload = () => {
      dispatch(setFalse());
      dispatch(setPaginationTotalNum(0));
      dispatch(setSearchText(''));
      dispatch(setCatName(''));
      dispatch(setPostClientY(0));
      dispatch(setPostsVar([]));
    };

    // 블로그 사이트 둘러보고 다른 사이트 이동시 redux storage 데이터 초기화
    window.addEventListener('beforeunload', handleBeforeUnload);

    // index home page에서 post click시 포스트를 보고, 뒤로가기 버튼을 클릭해도 해당 y 좌표 유지하게끔 하였음
    const handleScrollYofPostClick = () => {
      window.scrollBy(0, postClientY);
    };

    handleScrollYofPostClick();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [postsVar]);

  useEffect(() => {
    if (postsVar.length === 0) {
      handleTotal();
    }

    setRenderSidebar(
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
            Algorithm
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
    );
  }, []);

  return (
    <div ref={scrollContainerRef}>
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
            renderPosts
          )}
          {renderSidebar}
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
