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
  const [sideBarSelectedPost, setSideBarSelectedPost] = useState([]);
  const [sideBarSelectedChosenPost, setSideBarSelectedChosenPost] = useState(
    []
  );
  const [sideBarPageCount, setSideBarPageCount] = useState();

  const [homeBtnIndex, setHomeBtnIndex] = useState(false);
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
  }, [sideBarAccessIndex]);

  return (
    <section className={styles.home}>
      <Header homeBtnIndex={homeBtnIndex} setHomeBtnIndex={setHomeBtnIndex} />
      <div className={styles.homeBgImg}>
        <img src='../images/cathay.jpg' alt='' />
      </div>
      <div className={styles.title}>
        <span>IT & Game</span>
        <span>Blog</span>
      </div>
      <div className={styles.homeContentsPart}>
        <div className={styles.postsPart}>
          {!booleanSidebarIndex
            ? selectedArray?.map((post) => {
                return post === undefined ? (
                  <div></div>
                ) : (
                  <Link className='link' to={`/post/${post?._id}`}>
                    <HomePost post={post} />
                  </Link>
                );
              })
            : sideBarSelectedChosenPost?.map((post) => {
                return post === undefined ? (
                  <div></div>
                ) : (
                  <Link className='link' to={`/post/${post?._id}`}>
                    <HomePost post={post} />
                  </Link>
                );
              })}
        </div>
        <SidebarAboutMe
          setSideBarAccessIndex={setSideBarAccessIndex}
          setHomeBtnIndex={setHomeBtnIndex}
        />
      </div>
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
    </section>
  );
};

export default Home;
