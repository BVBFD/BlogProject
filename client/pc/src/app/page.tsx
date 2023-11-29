'use client';

import Image from 'next/image';
import { useContext, useRef } from 'react';
import { ThemeContext } from 'src/common/context/ThemeContext';
import Button from 'src/common/Button/Button';
import Link from 'next/link';
import DynamicTyped from 'src/common/Typedjs/Typedjs';

import styles from './page.module.scss';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { status } = useSession();
  const { mode } = useContext(ThemeContext);
  const headerImgRef = useRef(null);
  const handleOnComplete = () => {
    headerImgRef.current.style.filter = 'opacity(1) grayscale(0)';
  };

  return (
    status !== 'loading' && (
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
              'The Developer Leo LEE!',
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro veniam repellendus architecto, sit
                quidem laborum sunt impedit! Voluptates fuga, ipsam veniam, dolore ipsum odio, nobis molestiae incidunt
                tenetur consequatur iste.
              </p>
              <Button fontSize="1.2rem" height="2.5rem" href="/" text="Read More" width="9rem" />
            </div>
          </article>

          <article className={styles.recentPostsListMostPopular}>
            <div className={styles.recentPostsList}>
              <div className={styles.recentPostCard}>
                <div className={styles.recentPostCardImgBox}>
                  <Image
                    alt="recent_post_card"
                    className={styles.image}
                    fill
                    objectFit="cover"
                    src="/imgs/card_img_1.jpg"
                  />
                </div>
                <div className={styles.desc}>
                  <h1>Title 1</h1>
                  <span>Mon Apr 03 2023</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ullam ea necessitatibus,
                    hic soluta consectetur ad veniam praesentium a possimus enim dolores. Magni necessitatibus
                    voluptatem doloribus cupiditate, sint cumque?
                  </p>
                </div>
              </div>

              <div className={styles.recentPostCard}>
                <div className={styles.recentPostCardImgBox}>
                  <Image
                    alt="recent_post_card"
                    className={styles.image}
                    fill
                    objectFit="cover"
                    src="/imgs/card_img_2.jpg"
                  />
                </div>
                <div className={styles.desc}>
                  <h1>Title 2</h1>
                  <span>Mon Apr 03 2023</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ullam ea necessitatibus,
                    hic soluta consectetur ad veniam praesentium a possimus enim dolores. Magni necessitatibus
                    voluptatem doloribus cupiditate, sint cumque?
                  </p>
                </div>
              </div>

              <div className={styles.recentPostCard}>
                <div className={styles.recentPostCardImgBox}>
                  <Image
                    alt="recent_post_card"
                    className={styles.image}
                    fill
                    objectFit="cover"
                    src="/imgs/card_img_3.jpg"
                  />
                </div>
                <div className={styles.desc}>
                  <h1>Title 3</h1>
                  <span>Mon Apr 03 2023</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ullam ea necessitatibus,
                    hic soluta consectetur ad veniam praesentium a possimus enim dolores. Magni necessitatibus
                    voluptatem doloribus cupiditate, sint cumque?
                  </p>
                </div>
              </div>

              <div className={styles.recentPostCard}>
                <div className={styles.recentPostCardImgBox}>
                  <Image
                    alt="recent_post_card"
                    className={styles.image}
                    fill
                    objectFit="cover"
                    src="/imgs/card_img_4.jpg"
                  />
                </div>
                <div className={styles.desc}>
                  <h1>Title 4</h1>
                  <span>Mon Apr 03 2023</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laboriosam ullam ea necessitatibus,
                    hic soluta consectetur ad veniam praesentium a possimus enim dolores. Magni necessitatibus
                    voluptatem doloribus cupiditate, sint cumque?
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.mostPopularPosts}>
              <h3>What&apos;s Hot</h3>
              <h1>Most Popular</h1>
              <ul>
                <Link className={styles.mostPopularPost} href="/">
                  <li>
                    <span className={styles.categoryBtn}>HTML / GIT</span>
                    <p className={styles.details}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className={styles.author}>
                      <p>
                        Seong Eun Lee <span>- 10.03.2023</span>
                      </p>
                    </div>
                  </li>
                </Link>

                <Link className={styles.mostPopularPost} href="/">
                  <li>
                    <span className={styles.categoryBtn}>CSS</span>
                    <p className={styles.details}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className={styles.author}>
                      <p>
                        Seong Eun Lee <span>- 10.03.2023</span>
                      </p>
                    </div>
                  </li>
                </Link>

                <Link className={styles.mostPopularPost} href="/">
                  <li>
                    <span className={styles.categoryBtn}>JavaScript</span>
                    <p className={styles.details}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className={styles.author}>
                      <p>
                        Seong Eun Lee <span>- 10.03.2023</span>
                      </p>
                    </div>
                  </li>
                </Link>

                <Link className={styles.mostPopularPost} href="/">
                  <li>
                    <span className={styles.categoryBtn}>Front-End</span>
                    <p className={styles.details}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className={styles.author}>
                      <p>
                        Seong Eun Lee <span>- 10.03.2023</span>
                      </p>
                    </div>
                  </li>
                </Link>

                <Link className={styles.mostPopularPost} href="/">
                  <li>
                    <span className={styles.categoryBtn}>Back-End</span>
                    <p className={styles.details}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className={styles.author}>
                      <p>
                        Seong Eun Lee <span>- 10.03.2023</span>
                      </p>
                    </div>
                  </li>
                </Link>
              </ul>
            </div>
          </article>
        </main>
        <footer>
          <div className={styles.pagination}>pagination</div>
        </footer>
      </section>
    )
  );
}
