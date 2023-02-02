import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { GitHub, Dehaze, Close } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/user';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { logoutReduce } from '../redux/userSlice';

const Navbar = () => {
  const [boolean, setBoolean] = useState<boolean>(false);
  const sidebarUlRef = useRef() as React.MutableRefObject<any>;
  const { id, profilePic } = useSelector((state: RootState) => state.user);
  const [mounted, setMounted] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onLogout = (event: any) => {
    event.preventDefault();
    dispatch(logoutReduce());
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
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

          {id === '' ? (
            <div className={styles.loginSignup}>
              <Link href={'/login'} passHref>
                Login
              </Link>
              <Link href={'/signup'} passHref>
                Sign-Up
              </Link>
            </div>
          ) : (
            <div className={styles.logoutBox}>
              <span onClick={onLogout}>Log-out</span>
              <Link href={'/setting'} passHref>
                <div className={styles.profileImgBox}>
                  <Image
                    width={1}
                    height={1}
                    alt=''
                    src={`${profilePic}`}
                    crossOrigin='anonymous'
                  />
                </div>
              </Link>
            </div>
          )}
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
        <ul
          ref={sidebarUlRef}
          className={`${styles.sidebarUl} ${styles.close}`}
        >
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
          {id === '' ? (
            <div className={styles.settingsBox}>
              <Link href={'/login'} passHref>
                Login
              </Link>
              <Link href={'/signup'} passHref>
                Sign-Up
              </Link>
            </div>
          ) : (
            <div className={styles.logoutBox}>
              <span onClick={onLogout}>Log-out</span>
              <Link href={'/setting'} passHref>
                <div className={styles.profileImgBox}>
                  <Image
                    width={1}
                    height={1}
                    alt=''
                    src={`${profilePic}`}
                    crossOrigin='anonymous'
                  />
                </div>
              </Link>
            </div>
          )}
        </ul>
      </>
    )
  );
};

export default Navbar;
