import Image from 'next/image';
import styles from './index.module.scss';

const Banner = () => {
  return (
    <div className={styles.bannerBox}>
      <Image alt="banner" quality={50} height={20} src="/imgs/banner.png" width={1920} />
    </div>
  );
};

export default Banner;
