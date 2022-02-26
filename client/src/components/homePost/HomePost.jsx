import React from "react";
import styles from "./HomePost.module.css";

const HomePost = ({ post }) => {
  return (
    <div className={styles.homePost}>
      <div className={styles.imgBox}>
        <img src={post.imgUrl} alt="" />
      </div>
      <div className={styles.explains}>
        <span className={styles.title}>{post.title}</span>
        <span className={styles.date}>{post.date}</span>
        <p>{post.text}</p>
      </div>
    </div>
  );
};

export default HomePost;
