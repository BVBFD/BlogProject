import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header.jsx";
import HomePost from "../../components/homePost/HomePost.jsx";
import SidebarAboutMe from "../../components/sidebarAboutMe/SidebarAboutMe.jsx";
import styles from "./Home.module.css";

const Home = (props) => {
  const [totalPosts, setTotalPosts] = useState([
    "이거",
    "저거",
    "요거",
    "??",
    "토탈워",
    "마리",
    "협보",
    "구달",
    "소서노",
    "유리",
    "온조",
    "비류",
    "dfsaf",
    "vcxzv",
    "ytry",
    "bvc",
    "hlk",
    "cxvn",
    "ghgj",
    "oiu",
    "qpdf",
    "nbvlk",
    "fkdjgkf",
    "bkcvbjlksgml",
    "czxcsa",
    "CVZXCV",
    "가나",
    "다라",
    "조나단",
    "병신",
    "나는 올블랙이 좋아",
    "까까머리",
    "ㅍㄱㅈ",
    "ㄻㄴㅇㄹ",
    "ㅡㅠ푸",
    "ㅣㅕㅑㅐㅕㅑ",
    "ㄹㄴㅇㄹ",
    "느끼해",
    "사전",
    "쿵쿵따",
    "조심성을 모른다",
    "그래",
    "감히",
    "진짜",
    "왜",
    "소녀시대",
    "장난해",
    "몰라",
    "상표권",
    "나다",
    "리얼",
    "지랄하지마",
    "머 이병신아",
    "이럴수가",
    "이거 맞나",
    "머라냐",
    "지랄 맞네",
    "고자냐?",
    "ㅈㄹ하지마",
    "미린넘",
    "맛있다",
  ]);
  // category 클릭시 totalPosts값 변경예정!

  const [num, setNum] = useState(1);
  const [paginationRowNum, setPaginationRowNum] = useState(5);
  const [endNum, setEndNum] = useState(
    totalPosts.length % 4 === 0
      ? totalPosts.length / 4
      : totalPosts.length / 4 + 1
  );

  useEffect(() => {
    setEndNum(
      totalPosts.length % 4 === 0
        ? totalPosts.length / 4
        : totalPosts.length / 4 + 1
    );
  }, [totalPosts, endNum]);

  let selectedArray = [];
  for (let i = (num - 1) * 4; i < num * 4; i++) {
    selectedArray.push(totalPosts[i]);
  }
  selectedArray = selectedArray.filter((post) => post !== undefined);

  const nextPaginationNum = (e) => {
    console.log(totalPosts.length / 4, paginationRowNum, endNum);
    if (paginationRowNum + 4 > endNum) {
      setNum(num);
      return;
    }
    Number.isInteger(endNum) === true
      ? setNum(paginationRowNum + 1)
      : setNum(paginationRowNum + 2);
    // +2
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
    // -8
    setPaginationRowNum(paginationRowNum - 5);
  };

  return (
    <section className={styles.home}>
      <Header />
      <div className={styles.homeBgImg}>
        <img src="../images/cathay.jpg" alt="" />
      </div>
      <div className={styles.title}>
        <span>IT & Game</span>
        <span>Blog</span>
      </div>
      <div className={styles.homeContentsPart}>
        <div className={styles.postsPart}>
          {selectedArray.map((post) => {
            return <HomePost post={post} />;
          })}
        </div>
        <SidebarAboutMe />
      </div>
      <ul>
        <i
          class="fa-solid fa-circle-arrow-left"
          onClick={previousPaginationNum}
        ></i>
        {paginationRowNum === 5 && Number.isInteger(endNum) === false ? (
          <li
            className={styles.list}
            onClick={(e) => setNum(parseInt(e.target.innerText))}
          >
            1
          </li>
        ) : null}

        {totalPosts.map((post) => {
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
                  {Number.isInteger(endNum) === false
                    ? (totalPosts.indexOf(post) + 1) / 4 + 1
                    : (totalPosts.indexOf(post) + 1) / 4}
                </li>
              );
            } else {
              return null;
            }
          }
        })}
        <i
          class="fa-solid fa-circle-arrow-right"
          onClick={nextPaginationNum}
        ></i>
      </ul>
    </section>
  );
};

export default Home;
