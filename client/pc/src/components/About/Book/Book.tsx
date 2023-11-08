// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* eslint-disable @typescript-eslint/ban-ts-comment */
import styles from './Book.module.scss';
import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Wood from '../../../../public/imgs/wood.jpg';

type BookPropsType = {
  setImgLoadedProp: (imgLoaded: boolean) => void;
};

const HTMLFlipBook = dynamic(() => import('react-pageflip'), {
  ssr: true,
});

const Book = ({ setImgLoadedProp }: BookPropsType) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleWoodLoad = () => {
    setImgLoaded(true);
    setImgLoadedProp(true);
  };

  return (
    <section className={styles.container}>
      <Image
        src={Wood}
        alt="wood_desk"
        objectFit="cover"
        fill
        onLoad={handleWoodLoad}
        style={imgLoaded ? { border: '0.6rem ridge #703f2b', borderRadius: '1rem' } : { border: 'none' }}
      />
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
    </section>
  );
};

export default Book;
