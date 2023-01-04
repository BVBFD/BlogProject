import Image from 'next/image';
import styles from '../styles/Post.module.css';

const Post = ({ post }: any) => {
  const inputText = () => {
    return { __html: `${post?.text}` };
  };

  return (
    <div className={styles.wrapper}>
      <Image
        alt='postImg'
        src={
          `${post?.imgUrl}` == '../images/kislev.jpg'
            ? '/imgs/kislev.jpg'
            : `${post?.imgUrl}`
        }
        width={300}
        height={300}
      />
      <div className={styles.content}>
        <header>{post?.title}</header>
        <span>{new Date(post?.updatedAt).toDateString()}</span>
        <div dangerouslySetInnerHTML={inputText()}></div>
      </div>
    </div>
  );
};

export default Post;
