'use client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import styles from './page.module.scss';

const About = () => {
  return (
    <section className={styles.container}>
      <header>About Me</header>
      {/* @ts-ignore */}
      <HTMLFlipBook
        className={styles.book}
        drawShadow
        flippingTime={1000}
        height={500}
        mobileScrollSupport
        showCover
        size="stretch"
        startPage={0}
        usePortrait
        width={500}
      >
        <article className={styles.page}>
          <h1>Page Header - 1</h1>
          <main>
            <div className={styles.imgBox}>
              <Image
                alt=""
                fill
                objectFit="cover"
                src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              />
            </div>
            <div className={styles.details}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti cupiditate ipsa aliquam
              dignissimos harum fuga, in excepturi minima ex iusto asperiores perspiciatis. Magnam rem sequi alias
              architecto numquam. Laudantium.
            </div>
          </main>
          <footer>1</footer>
        </article>

        <article className={styles.page}>
          <h1>Page Header - 1</h1>
          <main>
            <div className={styles.imgBox}>
              <Image
                alt=""
                fill
                objectFit="cover"
                src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              />
            </div>
            <div className={styles.details}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti cupiditate ipsa aliquam
              dignissimos harum fuga, in excepturi minima ex iusto asperiores perspiciatis. Magnam rem sequi alias
              architecto numquam. Laudantium.
            </div>
          </main>
          <footer>1</footer>
        </article>
        <article className={styles.page}>
          <h1>Page Header - 1</h1>
          <main>
            <div className={styles.imgBox}>
              <Image
                alt=""
                fill
                objectFit="cover"
                src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              />
            </div>
            <div className={styles.details}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti cupiditate ipsa aliquam
              dignissimos harum fuga, in excepturi minima ex iusto asperiores perspiciatis. Magnam rem sequi alias
              architecto numquam. Laudantium.
            </div>
          </main>
          <footer>1</footer>
        </article>
        <article className={styles.page}>
          <h1>Page Header - 1</h1>
          <main>
            <div className={styles.imgBox}>
              <Image
                alt=""
                fill
                objectFit="cover"
                src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              />
            </div>
            <div className={styles.details}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti cupiditate ipsa aliquam
              dignissimos harum fuga, in excepturi minima ex iusto asperiores perspiciatis. Magnam rem sequi alias
              architecto numquam. Laudantium.
            </div>
          </main>
          <footer>1</footer>
        </article>
        <article className={styles.page}>
          <h1>Page Header - 1</h1>
          <main>
            <div className={styles.imgBox}>
              <Image
                alt=""
                fill
                objectFit="cover"
                src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              />
            </div>
            <div className={styles.details}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti cupiditate ipsa aliquam
              dignissimos harum fuga, in excepturi minima ex iusto asperiores perspiciatis. Magnam rem sequi alias
              architecto numquam. Laudantium.
            </div>
          </main>
          <footer>1</footer>
        </article>
        <article className={styles.page}>
          <h1>Page Header - 1</h1>
          <main>
            <div className={styles.imgBox}>
              <Image
                alt=""
                fill
                objectFit="cover"
                src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              />
            </div>
            <div className={styles.details}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti cupiditate ipsa aliquam
              dignissimos harum fuga, in excepturi minima ex iusto asperiores perspiciatis. Magnam rem sequi alias
              architecto numquam. Laudantium.
            </div>
          </main>
          <footer>1</footer>
        </article>
        <article className={styles.page}>
          <h1>Page Header - 1</h1>
          <main>
            <div className={styles.imgBox}>
              <Image
                alt=""
                fill
                objectFit="cover"
                src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              />
            </div>
            <div className={styles.details}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti cupiditate ipsa aliquam
              dignissimos harum fuga, in excepturi minima ex iusto asperiores perspiciatis. Magnam rem sequi alias
              architecto numquam. Laudantium.
            </div>
          </main>
          <footer>1</footer>
        </article>
        <article className={styles.page}>
          <h1>Page Header - 1</h1>
          <main>
            <div className={styles.imgBox}>
              <Image
                alt=""
                fill
                objectFit="cover"
                src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif"
              />
            </div>
            <div className={styles.details}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur corrupti cupiditate ipsa aliquam
              dignissimos harum fuga, in excepturi minima ex iusto asperiores perspiciatis. Magnam rem sequi alias
              architecto numquam. Laudantium.
            </div>
          </main>
          <footer>1</footer>
        </article>
      </HTMLFlipBook>
      {/* @ts-ignore */}
    </section>
  );
};

export default About;
