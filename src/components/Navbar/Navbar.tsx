'use client';

import React, { useContext, useEffect } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import logo from 'public/imgs/logo.png';
import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeContext';

const Navbar = () => {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <nav className={styles.navbar}>
      <Link href={'/'} className={styles.logoLink}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo" fill={true} />
        </div>
        <h1>LEO BLOG</h1>
      </Link>

      <main>
        <div
          className={styles.theme}
          onClick={toggle}
          style={mode === 'light' ? { border: '1.5px solid black' } : { border: '1.5px solid white' }}
        >
          <div className={styles.icon}>🌙</div>
          <div className={styles.icon}>🔆</div>
          <div
            className={styles.ball}
            style={
              mode === 'dark' ? { right: '5px', backgroundColor: 'white' } : { left: '5px', backgroundColor: 'black' }
            }
          ></div>
        </div>
        <Link href={'/'} className={styles.menuLink}>
          Home
        </Link>
        <Link href={'/portfolio'} className={styles.menuLink}>
          Portfolio
        </Link>
        <Link href={'/blog'} className={styles.menuLink}>
          Blog
        </Link>
        <Link href={'/about'} className={styles.menuLink}>
          About
        </Link>
        <Link href={'/contact'} className={styles.menuLink}>
          Contact
        </Link>
      </main>
    </nav>
  );
};

export default Navbar;
