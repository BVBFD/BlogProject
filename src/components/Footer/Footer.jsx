import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2023 Lamamia. All rights reserved.</div>
      <div className={styles.social}>
        <Image
          src='/1.png'
          alt='Lama Dev Facebook Account'
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src='/2.png'
          alt='Lama Dev Instagram Account'
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src='/3.png'
          alt='Lama Dev Twitter Account'
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src='/4.png'
          alt='Lama Dev Youtube Account'
          className={styles.icon}
          width={15}
          height={15}
        />
        {/* <Image src='/1.png' alt='Lama Dev' fill={true} /> */}
        {/* fill true 라고 작성을 하면 relative 기준 부모컨테이너 크기에 fill 채워지게됨 */}
      </div>
    </div>
  );
};

export default Footer;
