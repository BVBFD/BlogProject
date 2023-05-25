import Image from 'next/image';
import styles from './index.module.scss';

const Banner = () => {
  return (
    <div className={styles.bannerBox}>
      <Image alt="banner" height={20} src="/imgs/cathay.jpg" width={1920} />
    </div>
  );
};

export default Banner;
