import React from "react";
import BlogBodyBox from "./components/blogBodyBox/blogBodyBox";
import Header from "./components/headerBackGround/header";
import Navbar from "./components/navbar/navbar";
import styles from "./app.module.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

const App = ({ weatherTime, exchangeRate }) => {
  return (
    <>
      <Navbar weatherTime={weatherTime} exchangeRate={exchangeRate} />
      <Header />
      <ul className={styles.listBodyBox}>
        <li className={styles.listBox}>
          <BrowserRouter>
            <nav className={styles.blogNavBar}>
              <button className={`${styles.blogBtn} ${styles.homeBtn}`}>
                Home
              </button>
              <button className={`${styles.blogBtn} ${styles.booksBtn}`}>
                독서
              </button>
              <div className={styles.booksBox}>
                <Link>소설(북미, 유럽)</Link>
                <Link>소설(아시아)</Link>
                <Link>서양고전</Link>
                <Link>동양고전</Link>
                <Link>역사(서양)</Link>
                <Link>역사(동양)</Link>
              </div>
              <button className={`${styles.blogBtn} ${styles.codingsBtn}`}>
                코딩
              </button>
              <div className={styles.codingsBox}>
                <Link>HTML</Link>
                <Link>CSS</Link>
                <Link>JavaScript</Link>
                <Link>React</Link>
                <Link>Node JS</Link>
              </div>
              <button className={`${styles.blogBtn} ${styles.tripsBoxBtn}`}>
                여행
              </button>
              <div className={styles.tripsBox}>
                <Link>피지</Link>
                <Link>아이슬란드</Link>
                <Link>중국</Link>
                <Link>베트남</Link>
              </div>
            </nav>
            <Switch></Switch>
          </BrowserRouter>
        </li>
        <li className={styles.bodyBox}></li>
      </ul>
    </>
  );
};

export default App;
