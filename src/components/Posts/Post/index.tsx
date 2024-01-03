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
        // 현재 모바일 스크린의 높이
        const screenHeight = window.innerHeight;
        // 모바일 스크린 높이의 반
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
        {/* loading="eager"
            페이지가 로드될 때 모든 이미지가 미리 다운로드되므로
            초기에 화면에 이미지가 나타나는 속도가 빠릅니다.
            loading="lazy": 페이지가 로드될 때 이미지를 처음에 다운로드하지 않고,
            사용자가 스크롤하거나 특정 위치에 도달할 때 필요한 이미지만 다운로드되기
            때문에 초기에 로딩 속도가 빠릅니다.
            페이지의 모든 이미지가 필요하지 않다면 자원을 절약할 수 있습니다. */}
        <Image
          alt="postImg"
          crossOrigin="anonymous"
          fetchPriority="high"
          fill
          loading="lazy"
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
