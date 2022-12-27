import Post from '../pages/post/[id]';
import styles from '../styles/Posts.module.css';

const Posts = ({ selectedPost }: any) => {
  return (
    <div className={styles.wrapper}>
      {selectedPost?.map((post: any) =>
        post === undefined ? <div></div> : <Post post={post} />
      )}
    </div>
  );
};

export default Posts;
