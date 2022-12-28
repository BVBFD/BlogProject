import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { GitHub, Dehaze, Close } from '@mui/icons-material';
import { useRef, useState } from 'react';

const Navbar = () => {
  const [boolean, setBoolean] = useState<boolean>(false);
  const sidebarUlRef = useRef() as React.MutableRefObject<any>;

  return (
    <>
      <div className={styles.wrapper}>
        <Link
          className={styles.logo}
          href={'https://github.com/BVBFD'}
          passHref
          target={'_blank'}
        >
          <GitHub />
        </Link>

        <ul>
          <Link href={'/'} passHref>
            Home
          </Link>
          <Link href={'/about'} passHref>
            About
          </Link>
          <Link href={'/contact'} passHref>
            Contact
          </Link>
          <Link href={'/write'} passHref>
            Write
          </Link>
        </ul>

        <div className={styles.loginSignup}>
          <Link href={'login'} passHref>
            Login
          </Link>
          <Link href={'signup'} passHref>
            Sign-Up
          </Link>
        </div>
      </div>

      <div className={styles.sidebar}>
        {boolean ? (
          <Close
            onClick={(e: any) => {
              setBoolean(false);
              sidebarUlRef.current.classList.add(`${styles.close}`);
            }}
          />
        ) : (
          <Dehaze
            onClick={(e: any) => {
              setBoolean(true);
              sidebarUlRef.current.classList.remove(`${styles.close}`);
            }}
          />
        )}
      </div>
      <ul ref={sidebarUlRef} className={`${styles.sidebarUl} ${styles.close}`}>
        <Link href={'/'} passHref>
          Home
        </Link>
        <Link href={'/about'} passHref>
          About
        </Link>
        <Link href={'/contact'} passHref>
          Contact
        </Link>
        <Link href={'/write'} passHref>
          Write
        </Link>
        <Link href={'login'} passHref>
          Login
        </Link>
        <Link href={'signup'} passHref>
          Sign-Up
        </Link>
      </ul>
    </>
  );
};

export default Navbar;
