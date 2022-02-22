import React from "react";
import Header from "../../components/header/Header.jsx";
import HomePost from "../../components/homePost/HomePost.jsx";
import styles from "./Home.module.css";

const Home = (props) => {
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
          <HomePost />
          <HomePost />
          <HomePost />
          <HomePost />
        </div>
        <div className={styles.aboutMePart}>
          <header className={styles.aboutMeHeader}>About Me</header>
          <div className={styles.aboutMeImgBox}>
            <img src="../images/empire.jpg" alt="" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
            distinctio odit vitae ipsam harum!
          </p>
          <header className={styles.catHeader}>CATEGORIES</header>
          <div className={styles.catBox}>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>Node JS</span>
            <span>TypeScript</span>
            <span>Game</span>
            <span>Book</span>
          </div>
          <header className={styles.catSNSBox}>FOLLOW US</header>
          <div className={styles.snsMarks}>
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-twitter-square"></i>
            <i class="fab fa-pinterest-square"></i>
            <i class="fab fa-instagram-square"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
