import Link from 'next/link';
import React, { useState } from 'react';
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
  setOnProgress: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [imgShowUp, setImgShowUp] = useState(false);

  return (
    <div className={styles.wrapper}>
      {selectedPost?.map((post: PostType) =>
        post ? (
          <Link
            href={{
              pathname: `/post/${post._id}`,
            }}
            key={post._id}
          >
            <Post
              imgShowUp={imgShowUp}
              key={post._id}
              post={post}
              setImgShowUp={setImgShowUp}
              setOnProgress={setOnProgress}
            />
          </Link>
        ) : (
          /* eslint-disable-next-line */
          <a className={styles.emptyBox}>
            <div />
          </a>
        )
      )}
    </div>
  );
};
export default Posts;
