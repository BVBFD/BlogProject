import Image from 'next/image';
import { useMemo } from 'react';
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
  const dispatch = useDispatch();
  const renderPage = useMemo(() => {
    return (
      <div className={styles.content}>
        <header>{post.title}</header>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
    );
  }, [post]);

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <div
      className={styles.wrapper}
      onClick={(e) => {
        // post 페이지 클릭하고 해당 post dom 요소의 위쪽 y좌표를 redux storage에 저장
        dispatch(setPostClientY(e.currentTarget.getBoundingClientRect().top));
      }}
    >
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
