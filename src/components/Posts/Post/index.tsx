import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
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

const Post = ({ post, setOnProgress }: { post: PostType; setOnProgress: Dispatch<SetStateAction<boolean>> }) => {
  const inputText = () => {
    return { __html: `${post?.text}` };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgBox}>
        <Image
          alt="postImg"
          crossOrigin="anonymous"
          fill
          // loading="eager":
          // 페이지가 로드될 때 모든 이미지가 미리 다운로드되므로
          // 초기에 화면에 이미지가 나타나는 속도가 빠릅니다.

          // loading="lazy": 페이지가 로드될 때 이미지를 처음에 다운로드하지 않고,
          // 사용자가 스크롤하거나 특정 위치에 도달할 때 필요한 이미지만 다운로드되기
          // 때문에 초기에 로딩 속도가 빠릅니다.
          // 페이지의 모든 이미지가 필요하지 않다면 자원을 절약할 수 있습니다.
          loading="lazy"
          objectFit="contain"
          onLoad={() => setOnProgress(false)}
          onLoadStart={() => setOnProgress(true)}
          src={post?.imgUrl}
        />
      </div>
      <div className={styles.content}>
        <header>{post?.title}</header>
        <span>{new Date(post?.createdAt).toDateString()}</span>
        <div dangerouslySetInnerHTML={inputText()} />
      </div>
    </div>
  );
};

export default Post;
