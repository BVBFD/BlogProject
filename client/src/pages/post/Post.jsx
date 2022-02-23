import React from "react";
import Header from "../../components/header/Header";
import styles from "./Post.module.css";
import SidebarAboutMe from "../../components/sidebarAboutMe/SidebarAboutMe.jsx";

const Post = (props) => {
  return (
    <section className={styles.postPage}>
      <Header />
      <div className={styles.postBox}>
        <div className={styles.postImgTextBox}>
          <div className={styles.postTitleImgBox}>
            <img src="../images/cathay.jpg" alt="" />
          </div>
          <div className={styles.postTextBox}>
            <header className={styles.postHeader}>
              <span>캐세이</span>
              <div>
                <i class="fa-solid fa-pen-to-square"></i>
                <i class="fa-solid fa-trash"></i>
              </div>
            </header>
            <div className={styles.authorAndDate}>
              <p>
                Author: <span>lse126</span>
              </p>
              <span>Web Feb 23 2022</span>
            </div>
            <div className={styles.postContentText}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis nulla ipsum sapiente deserunt nisi, atque ab libero
                porro repellat, similique rem cum, ipsa magnam facere voluptatem
                quod iure enim excepturi.
              </p>
            </div>
          </div>
        </div>
        <SidebarAboutMe />
      </div>
    </section>
  );
};

export default Post;
