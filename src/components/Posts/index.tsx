import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import styles from './index.module.scss';
import Post from './Post';

interface PostType {
  _id: string;
  __v: number;
  updatedAt: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  catName: string;
  author: string;
}

const Posts = ({
  selectedPost,
  setOnProgress,
}: {
  selectedPost: PostType[];
  setOnProgress: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.wrapper}>
      {selectedPost?.map((post: PostType) =>
        post ? (
          <Link
            href={{
              // pathname: `/post/${post.title
              //   .replace('/', '!!')
              //   .replace('?', '!!')}`,
              // query: {
              //   id: post._id,
              // },
              pathname: `/post/${post._id}`,
            }}
            key={post._id}
          >
            <Post key={post._id} post={post} setOnProgress={setOnProgress} />
          </Link>
        ) : (
          /* eslint-disable-next-line */
          <a>
            <div />
          </a>
        )
      )}
    </div>
  );
};

export default Posts;
