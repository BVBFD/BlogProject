import Link from 'next/link';
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
  setImgShowUp,
  imgShowUp,
}: {
  selectedPost: PostType[];
  setOnProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setImgShowUp: React.Dispatch<React.SetStateAction<boolean>>;
  imgShowUp: boolean;
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
          <a>
            <div />
          </a>
        )
      )}
    </div>
  );
};

export default Posts;
