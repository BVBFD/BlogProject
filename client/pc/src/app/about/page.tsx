'use client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';

import Book from 'src/components/About/Book/Book';

import styles from './page.module.scss';

const About = () => {
  const [imgLoadedProp, setImgLoadedProp] = useState(false);

  return (
    <section className={styles.container}>
      <header>{imgLoadedProp ? 'About Me' : ''}</header>
      <Book setImgLoadedProp={setImgLoadedProp} />
    </section>
  );
};

export default About;
