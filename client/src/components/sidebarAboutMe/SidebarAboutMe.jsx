import React from "react";
import styles from "./SidebarAboutMe.module.css";

const SidebarAboutMe = ({ setSideBarAccessIndex, setHomeBtnIndex }) => {
  const setIndex = (e) => {
    if (e.target.nodeName === "SPAN") {
      setHomeBtnIndex(true);
      setSideBarAccessIndex(e.target.innerText);
    }
  };

  return (
    <div className={styles.aboutMePart}>
      <header className={styles.aboutMeHeader}>About Me</header>
      <div className={styles.aboutMeImgBox}>
        <img src="../images/charina.gif" alt="" />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut distinctio
        odit vitae ipsam harum!
      </p>
      <header className={styles.catHeader}>CATEGORIES</header>
      <div onClick={setIndex} className={styles.catBox}>
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
  );
};

export default SidebarAboutMe;
