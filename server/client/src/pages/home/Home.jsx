import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import HomePost from '../../components/homePost/HomePost.jsx';
import SidebarAboutMe from '../../components/sidebarAboutMe/SidebarAboutMe.jsx';
import axiosInstance from '../../config.js';
import styles from './Home.module.css';
import ReactPaginate from 'react-paginate';

const Home = (props) => {
  const [totalPosts, setTotalPosts] = useState([]);

  const [sideBarAccessIndex, setSideBarAccessIndex] = useState('');

  const [booleanSidebarIndex, setBooleanSidebarIndex] = useState(false);
  const [searchingTitle, setSearchingTitle] = useState('');
  const [searchingTitleArray, setSearchingTitleArray] = useState([]);
  const [searchingTitleShownArray, setSearchingTitleShownArray] = useState([]);

  const [sideBarSelectedPost, setSideBarSelectedPost] = useState([]);
  const [sideBarSelectedChosenPost, setSideBarSelectedChosenPost] = useState(
    []
  );
  const [sideBarPageCount, setSideBarPageCount] = useState();
  const [pageCount, setpageCount] = useState();
  const [selectedArray, setSelectedArray] = useState([]);

  const handlePageClick = (event) => {
    const newArray = [
      totalPosts[event.selected * 4],
      totalPosts[event.selected * 4 + 1],
      totalPosts[event.selected * 4 + 2],
      totalPosts[event.selected * 4 + 3],
    ];
    setSelectedArray(newArray);
  };

  const sideBarHandleClick = (event) => {
    const newArray = [
      sideBarSelectedPost[event.selected * 4],
      sideBarSelectedPost[event.selected * 4 + 1],
      sideBarSelectedPost[event.selected * 4 + 2],
      sideBarSelectedPost[event.selected * 4 + 3],
    ];
    setSideBarSelectedChosenPost(newArray);
  };

  useEffect(async () => {
    // 기존 APIs request 문법!
    // try {
    //   const response = await fetch(`http://localhost:5000/posts`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   const data = await response.json();
    //   setTotalPosts(data);
    // } catch (err) {
    //   console.log(err);
    // }

    // axios 라이브러리 사용!
    try {
      const res = await axiosInstance.get(`/posts`);
      // prettier-ignore
      setpageCount(Math.ceil(res.data.reverse().length / 4));
      setSelectedArray([res.data[0], res.data[1], res.data[2], res.data[3]]);
      setTotalPosts(res.data);
      setBooleanSidebarIndex(false);
    } catch (err) {
      window.alert(err);
    }
  }, []);

  useEffect(() => {
    const lis = document.querySelectorAll(`.pagination .page-item`);
    const liDis = document.querySelector('.pagination .page-item.disabled');
    const liAct = document.querySelector('.pagination .page-item.active');

    liDis?.classList?.remove('disabled');
    liAct?.classList?.remove('active');
    lis[1].querySelector('a').click();

    const selectedPostsArray = totalPosts.filter(
      (post) => post.catName === sideBarAccessIndex
    );

    if (sideBarAccessIndex === undefined) {
      setSideBarPageCount(Math.ceil(totalPosts?.length / 4));

      const newArray = [
        totalPosts[0],
        totalPosts[1],
        totalPosts[2],
        totalPosts[3],
      ];

      setSideBarSelectedChosenPost(newArray);
      setSideBarSelectedPost(totalPosts);
      setBooleanSidebarIndex(true);
    } else {
      setSideBarPageCount(Math.ceil(selectedPostsArray?.length / 4));

      const newArray = [
        selectedPostsArray[0],
        selectedPostsArray[1],
        selectedPostsArray[2],
        selectedPostsArray[3],
      ];

      setSideBarSelectedChosenPost(newArray);
      setSideBarSelectedPost(selectedPostsArray);
      setBooleanSidebarIndex(true);
      // category 목록별 posts 글들 분류 화면에 표시
    }
  }, [sideBarAccessIndex]);

  const showTotalPosts = () => {
    // setBooleanSidebarIndex(false);
    // setSideBarAccessIndex(undefined);
    window.location.reload();
    // 전체 posts 띄우기!!
  };

  const handleSearchInputChange = (e) => {
    const searchTitle = e.target.value.replace(/(\s*)/g, '').toLowerCase();
    setSearchingTitle(searchTitle);
  };

  useEffect(() => {
    // searchingInputTitleArray
    let filtered = [];
    let postTitle = '';
    if (booleanSidebarIndex) {
      filtered = sideBarSelectedPost.filter((post) => {
        postTitle = post.title.replace(/(\s*)/g, '').toLowerCase();
        return postTitle.includes(searchingTitle);
      });
      setSearchingTitleArray(filtered);
    }

    if (!booleanSidebarIndex) {
      filtered = totalPosts.filter((post) => {
        postTitle = post.title.replace(/(\s*)/g, '').toLowerCase();
        return postTitle.includes(searchingTitle);
      });
      setSearchingTitleArray(filtered);
    }

    if (searchingTitle === '') {
      setSearchingTitleArray([]);
    }

    setSearchingTitleShownArray([
      filtered[0],
      filtered[1],
      filtered[2],
      filtered[3],
    ]);

    // pagenation 정리
    // prettier-ignore
    setpageCount(Math.ceil(filtered.reverse().length / 4));
  }, [searchingTitle]);

  return (
    <section className={styles.home}>
      <Header />
      <div className={styles.homeBgImg}>
        <img src='../images/cathay.jpg' alt='' />
      </div>
      <div className={styles.title}>
        <span>IT & Game</span>
        <span>Blog</span>
      </div>
      <div className={styles.totalSearchBox}>
        <button className={styles.openTotalPosts} onClick={showTotalPosts}>
          Total Posts
        </button>
        {!booleanSidebarIndex ? (
          <input
            className={styles.searchInput}
            type='text'
            placeholder='Searching Posts...'
            onChange={handleSearchInputChange}
          />
        ) : (
          ''
        )}
      </div>
      <div className={styles.homeContentsPart}>
        <div className={styles.postsPart}>
          {!booleanSidebarIndex && searchingTitleArray?.length === 0
            ? selectedArray?.map((post) => {
                return post === undefined ? (
                  ''
                ) : (
                  <Link className='link' to={`/post/${post?._id}`}>
                    <HomePost post={post} />
                  </Link>
                );
              })
            : sideBarSelectedChosenPost?.map((post) => {
                return post === undefined ? (
                  ''
                ) : (
                  <Link className='link' to={`/post/${post?._id}`}>
                    <HomePost post={post} />
                  </Link>
                );
              })}
          {searchingTitleArray?.length !== 0 &&
            searchingTitleShownArray?.map((post) => {
              return post === undefined ? (
                ''
              ) : (
                <Link className='link' to={`/post/${post?._id}`}>
                  <HomePost post={post} />
                </Link>
              );
            })}
        </div>
        <SidebarAboutMe setSideBarAccessIndex={setSideBarAccessIndex} />
      </div>
      {searchingTitleArray?.length === 0 ? (
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={''}
          pageCount={!booleanSidebarIndex ? pageCount : sideBarPageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={4}
          onPageChange={
            !booleanSidebarIndex ? handlePageClick : sideBarHandleClick
          }
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      ) : (
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={''}
          pageCount={!booleanSidebarIndex ? pageCount : sideBarPageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={4}
          onPageChange={(event) => {
            let newArray = [
              searchingTitleArray.reverse()[event.selected * 4],
              searchingTitleArray.reverse()[event.selected * 4 + 1],
              searchingTitleArray.reverse()[event.selected * 4 + 2],
              searchingTitleArray.reverse()[event.selected * 4 + 3],
            ];
            setSearchingTitleShownArray(newArray);
          }}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      )}
    </section>
  );
};

export default Home;
