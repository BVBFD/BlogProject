import Image from 'next/image';
import styles from '../../styles/Post.module.css';

const Post = ({ post }: any) => {
  return (
    <div className={styles.wrapper}>
      <Image alt='postImg' src='/imgs/kislev.jpg' width={300} height={300} />
      <div className={styles.content}>
        <header>Kislev feat.Charina Kathrine</header>
        <span>Web Dec 14 2022</span>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          illum neque dolores explicabo facilis corrupti natus dolore, culpa
          fugiat deserunt, porro dicta consectetur atque voluptatibus
          doloremque, aut odit nulla nemo? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ullam, facere! Fuga quaerat deserunt
          earum nobis natus, eveniet sit tempore tempora, ea eius cumque aliquam
          temporibus nam id provident beatae velit.
        </div>
      </div>
    </div>
  );
};

export default Post;
