import Image from 'next/image';
import styles from '../styles/Banner.module.css';

const Banner = () => {
  return (
    <div className={styles.bannerBox}>
      <Image width={1920} height={20} alt='banner' src={'/imgs/cathay.jpg'} />
    </div>
  );
};

export default Banner;
