import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import HomePost from '../../components/homePost/HomePost.jsx';
import SidebarAboutMe from '../../components/sidebarAboutMe/SidebarAboutMe.jsx';
import { axiosInstance } from '../../config.js';
import styles from './Home.module.css';

const Home = (props) => {
  const [totalPosts, setTotalPosts] = useState([]);
  const [num, setNum] = useState(1);
  const [paginationRowNum, setPaginationRowNum] = useState(5);
  const [endNum, setEndNum] = useState(totalPosts.length / 4 + 4);
  const [sideBarAccessIndex, setSideBarAccessIndex] = useState('');
  const [selectedPostsArray, setSelectedPostsArray] = useState([]);
  const [homeBtnIndex, setHomeBtnIndex] = useState(false);

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
      setTotalPosts(res.data.reverse());
    } catch (err) {
      window.alert(err);
    }
  }, []);

  useEffect(() => {
    const selectedPostsArray = totalPosts.filter(
      (post) => post.catName === sideBarAccessIndex
    );
    setSelectedPostsArray(selectedPostsArray);
    return () => setSelectedPostsArray([]);
    // selectedPostsArray는 category 목록별 posts 글들 분류 화면에 표시
  }, [sideBarAccessIndex, totalPosts]);

  useEffect(() => {
    setEndNum(selectedPostsArray.length / 4 + 4);
  }, [selectedPostsArray]);

  let selectedArray = [];
  for (let i = (num - 1) * 4; i < num * 4; i++) {
    !homeBtnIndex
      ? selectedArray.push(totalPosts[i])
      : selectedArray.push(selectedPostsArray[i]);
  }
  selectedArray = selectedArray.filter((post) => post !== undefined);
  //selectedArray는 pagenation 번호당 화면에 보여지는 4개 포스트 글 선정

  const nextPaginationNum = (e) => {
    if (paginationRowNum + 4 > endNum) {
      setNum(num);
      return;
    }
    Number.isInteger(endNum) === true
      ? setNum(paginationRowNum + 1)
      : setNum(paginationRowNum + 2);
    setPaginationRowNum(paginationRowNum + 5);
  };

  const previousPaginationNum = (e) => {
    if (num <= 10 && paginationRowNum <= 10) {
      setNum(1);
      setPaginationRowNum(5);
      return;
    }
    Number.isInteger(endNum) === true
      ? setNum(paginationRowNum - 9)
      : setNum(paginationRowNum - 8);
    setPaginationRowNum(paginationRowNum - 5);
  };

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
          {selectedArray.map((post) => {
            return (
              <Link className='link' to={`/post/${post._id}`}>
                <HomePost post={post} />
              </Link>
            );
          })}
        </div>
        <SidebarAboutMe
          setSideBarAccessIndex={setSideBarAccessIndex}
          setHomeBtnIndex={setHomeBtnIndex}
          setNum={setNum}
        />
      </div>
      <ul>
        <i
          class='fa-solid fa-circle-arrow-left'
          onClick={previousPaginationNum}
        ></i>
        {paginationRowNum === 5 &&
        Number.isInteger(endNum) === (homeBtnIndex ? false : true) ? (
          <li
            className={styles.list}
            onClick={(e) => setNum(parseInt(e.target.innerText))}
          >
            1
          </li>
        ) : null}

        {!homeBtnIndex
          ? totalPosts.map((post) => {
              if ((totalPosts.indexOf(post) + 1) % 4 === 0) {
                if (
                  (totalPosts.indexOf(post) + 1) / 4 <= paginationRowNum &&
                  (totalPosts.indexOf(post) + 1) / 4 > paginationRowNum - 5
                ) {
                  return (
                    <li
                      className={styles.list}
                      onClick={(e) => setNum(parseInt(e.target.innerText))}
                    >
                      {Number.isInteger(endNum) ===
                      (homeBtnIndex ? false : true)
                        ? (totalPosts.indexOf(post) + 1) / 4 + 1
                        : (totalPosts.indexOf(post) + 1) / 4}
                    </li>
                  );
                } else {
                  return null;
                }
              }
            })
          : selectedPostsArray.map((post) => {
              if ((selectedPostsArray.indexOf(post) + 1) % 4 === 0) {
                if (
                  (selectedPostsArray.indexOf(post) + 1) / 4 <=
                    paginationRowNum &&
                  (selectedPostsArray.indexOf(post) + 1) / 4 >
                    paginationRowNum - 5
                ) {
                  return (
                    <li
                      className={styles.list}
                      onClick={(e) => setNum(parseInt(e.target.innerText))}
                    >
                      {Number.isInteger(endNum) === false
                        ? (selectedPostsArray.indexOf(post) + 1) / 4 + 1
                        : (selectedPostsArray.indexOf(post) + 1) / 4}
                    </li>
                  );
                } else {
                  return null;
                }
              }
            })}
        <i
          class='fa-solid fa-circle-arrow-right'
          onClick={nextPaginationNum}
        ></i>
      </ul>
    </section>
  );
};

export default Home;
