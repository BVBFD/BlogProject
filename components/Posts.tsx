import Post from './Post';
import styles from '../styles/Posts.module.css';

const Posts = () => {
  return (
    <div className={styles.wrapper}>
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
