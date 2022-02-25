import React from "react";
import styles from "./HomePost.module.css";

const HomePost = ({ post }) => {
  return (
    <div className={styles.homePost}>
      <div className={styles.imgBox}>
        <img src="../images/kislev.jpg" alt="" />
      </div>
      <div className={styles.explains}>
        <span className={styles.title}>{post}</span>
        <span className={styles.date}>Wed Jul 28 1993</span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
};

export default HomePost;
