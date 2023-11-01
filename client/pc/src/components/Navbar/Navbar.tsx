'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import logo from 'public/imgs/logo.png';
import Link from 'next/link';

import { ThemeContext } from '@common/src/context/ThemeContext';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <nav className={styles.navbar}>
      <Link className={styles.logoLink} href="/">
        <div
          className={styles.logo}
          style={mode === 'light' ? { boxShadow: '0px 0px 12px gold' } : { boxShadow: '0px 0px 12px red' }}
        >
          <Image alt="logo" fill src={logo} />
        </div>
        <h1
          style={mode === 'light' ? { textShadow: '2px 2px 0.1px darkgray' } : { textShadow: '2px 2px 0.1px darkred' }}
        >
          LEO BLOG
        </h1>
      </Link>

      <main>
        <button
          className={styles.theme}
          onClick={toggle}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              toggle();
            }
          }}
          style={mode === 'light' ? { border: '1.5px solid black' } : { border: '1.5px solid white' }}
          type="button"
        >
          <div className={styles.icon}>🌙</div>
          <div className={styles.icon}>🔆</div>
          <div
            className={styles.ball}
            style={
              mode === 'dark' ? { right: '5px', backgroundColor: 'white' } : { left: '5px', backgroundColor: 'black' }
            }
          />
        </button>
        <Link className={styles.menuLink} href="/">
          Home
        </Link>
        <Link className={styles.menuLink} href="/portfolio">
          Portfolio
        </Link>
        <Link className={styles.menuLink} href="/blog">
          Blog
        </Link>
        <Link className={styles.menuLink} href="/about">
          About
        </Link>
        <Link className={styles.menuLink} href="/contact">
          Contact
        </Link>
      </main>
    </nav>
  );
};

export default Navbar;
