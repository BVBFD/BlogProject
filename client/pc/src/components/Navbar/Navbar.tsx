'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import logo from 'public/imgs/logo.png';
import Link from 'next/link';
import { ThemeContext } from 'src/common/context/ThemeContext';
import Button from 'src/common/Button/Button';

import { usePopUp } from 'src/common/context/UsePopUp';
import PopUp from 'src/common/PopUp/PopUp';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const { toggle, mode } = useContext(ThemeContext);
  const { showPopUp, closePopUp } = usePopUp();

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
        <Link className={styles.menuLink} href="/about">
          About
        </Link>
        <Link className={styles.menuLink} href="/write">
          Write
        </Link>
        <Link className={styles.menuLink} href="/contact">
          Contact
        </Link>
        <Button
          className={styles.menuLink}
          height="2rem"
          href=""
          onClick={() =>
            showPopUp(<PopUp content="Test PopUp Screen" onClose={closePopUp} title="Test PopUp Screen" />)
          }
          text="Log-In"
          width="4.8rem"
        />
        <Button className={styles.menuLink} height="2rem" href="/signup" text="Sign-Up" width="4.8rem" />
      </main>
    </nav>
  );
};

export default Navbar;
