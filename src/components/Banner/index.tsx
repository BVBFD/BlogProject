import Image from 'next/image';
import styles from './index.module.scss';

const Banner = () => {
  return (
    <div className={styles.bannerBox}>
      <Image alt="banner" height={20} quality={1} src="/imgs/blog-image-banner.png" width={1920} />
    </div>
  );
};

export default Banner;
