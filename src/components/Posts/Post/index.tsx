import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPostClientY } from '@/redux/postClientYSlice';
import styles from './index.module.scss';

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

const Post = ({
  post,
  imgShowUp,
  setImgShowUp,
  setOnProgress,
}: {
  post: PostType;
  imgShowUp: boolean;
  setImgShowUp: React.Dispatch<React.SetStateAction<boolean>>;
  setOnProgress: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const postRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useDispatch();
  const renderPage = useMemo(() => {
    return (
      <div className={styles.content}>
        <header>{post.title}</header>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
    );
  }, [post]);

  useEffect(() => {
    let eventBol = true;

    const handleClickEvent = (e: MouseEvent) => {
      if (eventBol && e.currentTarget instanceof Element) {
        const { top, bottom } = e.currentTarget.getBoundingClientRect();
        const half = (bottom - top) / 2;
        dispatch(setPostClientY(top + half));
      }

      return undefined;
    };

    const handleTouchEvent = (e: TouchEvent) => {
      if (eventBol) {
        const screenHeight = window.innerHeight;
        const centerY = screenHeight / 2;

        const { pageY } = e.touches[0];
        const adjustedPageY = pageY - centerY;

        dispatch(setPostClientY(adjustedPageY));
      }

      eventBol = false;
      return undefined;
    };

    const postElement = postRef.current;

    if (postElement) {
      postElement.addEventListener('click', handleClickEvent);
      postElement.addEventListener('touchstart', handleTouchEvent);

      return () => {
        postElement.removeEventListener('click', handleClickEvent);
        postElement.removeEventListener('touchstart', handleTouchEvent);
      };
    }

    return () => {};
  }, [postRef]);

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <div className={styles.wrapper} ref={postRef}>
      <div className={styles.imgBox}>
        <Image
          alt="postImg"
          crossOrigin="anonymous"
          fetchPriority="auto"
          fill
          loading="eager"
          objectFit="contain"
          onLoad={() => {
            setImgShowUp(true);
            setOnProgress(false);
          }}
          onLoadStart={() => setOnProgress(true)}
          quality={1}
          src={post.imgUrl}
        />
      </div>
      {imgShowUp && renderPage}
    </div>
  );
};

export default Post;
