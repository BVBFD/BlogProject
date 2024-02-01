import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const PostsBol = selectedPost.every((post) => post === undefined);
    setNotFound(PostsBol);
  }, [selectedPost]);

  return (
    <div className={styles.wrapper}>
      {!notFound ? (
        selectedPost.map((post: PostType) =>
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
        )
      ) : (
        <div className={styles.notFoundBox}>
          <Image alt="post-not-found" fill src="/imgs/post-not-found.gif" />
        </div>
      )}
    </div>
  );
};
export default Posts;
