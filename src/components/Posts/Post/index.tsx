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
    const handleInteraction = (e: TouchEvent | MouseEvent) => {
      let offsetY: number;

      if ('touches' in e) {
        // Touch event
        offsetY = e.touches[0].pageY;
      } else {
        // Mouse event
        offsetY = e.clientY;
      }

      dispatch(setPostClientY(offsetY));
    };

    const postElement = postRef.current;

    if (postElement) {
      // Add event listener for both click and touch events
      postElement.addEventListener('click', handleInteraction);
      postElement.addEventListener('touchstart', handleInteraction);

      // Cleanup: remove event listeners on unmount
      return () => {
        postElement.removeEventListener('click', handleInteraction);
        postElement.removeEventListener('touchstart', handleInteraction);
      };
    }

    // postRef does not exist, nothing to clean up
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
          fill
          loading="eager"
          objectFit="contain"
          onLoad={() => {
            setImgShowUp(true);
            setOnProgress(false);
          }}
          onLoadStart={() => setOnProgress(true)}
          priority
          quality={1}
          src={post.imgUrl}
        />
      </div>
      {imgShowUp && renderPage}
    </div>
  );
};

export default Post;
