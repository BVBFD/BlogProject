import React from "react";
import Header from "../../components/header/Header.jsx";
import HomePost from "../../components/homePost/HomePost.jsx";
import SidebarAboutMe from "../../components/sidebarAboutMe/SidebarAboutMe.jsx";
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
        <SidebarAboutMe />
      </div>
    </section>
  );
};

export default Home;
