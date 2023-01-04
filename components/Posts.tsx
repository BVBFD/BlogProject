import Link from 'next/link';
import styles from '../styles/Posts.module.css';
import Post from './Post';

const Posts = ({ selectedPost }: any) => {
  return (
    <div className={styles.wrapper}>
      {selectedPost?.map((post: any) =>
        post === undefined ? (
          <div></div>
        ) : (
          <Link
            href={{
              pathname: `/post/${post.title
                .replace('/', '!!')
                .replace('?', '!!')}`,
              query: {
                id: post._id,
              },
            }}
          >
            <Post post={post} />
          </Link>
        )
      )}
    </div>
  );
};

export default Posts;
