'use client';

import Image from 'next/image';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useContext, useRef } from 'react';
import { ThemeContext } from '@common/src/context/ThemeContext';

import styles from './page.module.scss';

const DynamicTyped = dynamic(() => import('../common/Typedjs/Typedjs'), {
  ssr: true,
});

export default function Home() {
  const { mode } = useContext(ThemeContext);
  const headerImgRef = useRef(null);
  const handleOnComplete = () => {
    headerImgRef.current.style.filter = 'opacity(1) grayscale(0)';
  };

  return (
    <section className={styles.container}>
      <header style={mode === 'light' ? { boxShadow: '0px 0px 12px black' } : { boxShadow: '0px 0px 12px #DFE0DF' }}>
        <Image alt="header_img" fill objectFit="cover" ref={headerImgRef} src="/imgs/home_img_header.jpg" />
        <DynamicTyped
          handleOnComplete={handleOnComplete}
          strings={[
            'Hello',
            'Good to Meet You, Bro!',
            'What Is It?',
            'This is My Tech Blog!',
            'So, Who you are?',
            'The Web Developer Leo LEE!',
          ]}
        />
      </header>
      <main>
        <article className={styles.recentPost}>
          <div className={styles.imgBox}>
            <Image
              alt="recent_post"
              fill
              objectFit="cover"
              objectPosition="center"
              src="/imgs/recentPost_sample_page.jpg"
            />
          </div>
          <div className={styles.detail}>
            <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro veniam repellendus architecto, sit quidem
              laborum sunt impedit! Voluptates fuga, ipsam veniam, dolore ipsum odio, nobis molestiae incidunt tenetur
              consequatur iste.
            </p>
            <Link href="/">Read More</Link>
          </div>
        </article>

        <article className={styles.recentPostsList}>
          <div className={styles.recentPostCard}>
            <div className={styles.recentPostCardImgBox}>
              {/* <Image src="/imgs/card_img_1.jpg" alt="recent_post_card" fill={true} className={styles.image} /> */}
            </div>
            <h1>Title 1</h1>
            <span>Mon Apr 03 2023</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ullam ea necessitatibus, hic
              soluta consectetur ad veniam praesentium a possimus enim dolores. Magni necessitatibus voluptatem
              doloribus cupiditate, sint cumque?
            </p>
          </div>

          <div className={styles.recentPostCard}>
            <div className={styles.recentPostCardImgBox}>
              {/* <Image src="/imgs/card_img_2.jpg" alt="recent_post_card" fill={true} className={styles.image} /> */}
            </div>
            <h1>Title 2</h1>
            <span>Mon Apr 03 2023</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ullam ea necessitatibus, hic
              soluta consectetur ad veniam praesentium a possimus enim dolores. Magni necessitatibus voluptatem
              doloribus cupiditate, sint cumque?
            </p>
          </div>

          <div className={styles.recentPostCard}>
            <div className={styles.recentPostCardImgBox}>
              {/* <Image src="/imgs/card_img_3.jpg" alt="recent_post_card" fill={true} className={styles.image} /> */}
            </div>
            <h1>Title 3</h1>
            <span>Mon Apr 03 2023</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ullam ea necessitatibus, hic
              soluta consectetur ad veniam praesentium a possimus enim dolores. Magni necessitatibus voluptatem
              doloribus cupiditate, sint cumque?
            </p>
          </div>

          <div className={styles.recentPostCard}>
            <div className={styles.recentPostCardImgBox}>
              {/* <Image src="/imgs/card_img_4.jpg" alt="recent_post_card" fill={true} className={styles.image} /> */}
            </div>
            <h1>Title 4</h1>
            <span>Mon Apr 03 2023</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ullam ea necessitatibus, hic
              soluta consectetur ad veniam praesentium a possimus enim dolores. Magni necessitatibus voluptatem
              doloribus cupiditate, sint cumque?
            </p>
          </div>
        </article>
      </main>
    </section>
  );
}
