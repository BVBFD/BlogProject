import Link from 'next/link';
import { CloseOutlined, GithubFilled, UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/sliceStore';
import { logoutReduce } from '@/redux/userSlice';
import BasicButton from '@/common/BasicButton';
import { usePopUp } from '@/common/UsePopUp';
import { useRouter } from 'next/router';
import { setPostsVar } from '@/redux/postsVarSlice';
import styles from './index.module.scss';
import LoginPopup from './LoginPopup';
import SignupPopUp from './SignupPopup';

const Navbar = () => {
  const [boolean, setBoolean] = useState<boolean>(false);
  const sidebarUlRef = useRef() as React.MutableRefObject<HTMLUListElement>;
  const { id, profilePic } = useSelector((state: RootState) => state.user);
  const [mounted, setMounted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { showPopUp } = usePopUp();
  const router = useRouter();

  const onLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(logoutReduce());
  };

  const handleLogin = () => {
    showPopUp(<LoginPopup />);
  };

  const handleSignup = () => {
    showPopUp(<SignupPopUp />);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <>
      <div className={styles.wrapper}>
        <Link className={styles.logo} href="https://github.com/BVBFD" passHref target="_blank">
          <GithubFilled />
        </Link>

        <ul>
          <Link
            href="/"
            onClick={(e) => {
              if (router.route === '/') {
                e.preventDefault();
              } else if (router.route.includes('/post')) {
                router.push('/');
              } else {
                dispatch(setPostsVar([]));
              }
            }}
            passHref
          >
            Home
          </Link>
          <Link href="/about" passHref>
            About
          </Link>
          <Link href="/write" passHref>
            Write
          </Link>
          <Link href="/contact" passHref>
            Contact
          </Link>
        </ul>

        {id === '' ? (
          <div className={styles.loginSignup}>
            <BasicButton BasicButtonType="small" onClick={handleLogin}>
              Login
            </BasicButton>
            <BasicButton BasicButtonType="small" onClick={handleSignup}>
              Sign-Up
            </BasicButton>
          </div>
        ) : (
          <div className={styles.logoutBox}>
            <BasicButton BasicButtonType="small" onClick={onLogout}>
              Log-out
            </BasicButton>
            <Link href="/setting" passHref>
              <div className={styles.profileImgBox}>
                <img alt="" crossOrigin="anonymous" height={1} src={`${profilePic}`} width={1} />
              </div>
            </Link>
          </div>
        )}
      </div>

      <div className={styles.sidebar}>
        {boolean ? (
          <CloseOutlined
            onClick={() => {
              setBoolean(false);
              sidebarUlRef.current.classList.add(`${styles.close}`);
            }}
          />
        ) : (
          <UnorderedListOutlined
            onClick={() => {
              setBoolean(true);
              sidebarUlRef.current.classList.remove(`${styles.close}`);
            }}
          />
        )}
      </div>
      <ul className={`${styles.sidebarUl} ${styles.close}`} ref={sidebarUlRef}>
        <Link href="/" passHref>
          Home
        </Link>
        <Link href="/about" passHref>
          About
        </Link>
        <Link href="/write" passHref>
          Write
        </Link>
        <Link href="/contact" passHref>
          Contact
        </Link>
        {id === '' ? (
          <div className={styles.settingsBox}>
            <BasicButton BasicButtonType="small" onClick={handleLogin}>
              Login
            </BasicButton>
            <BasicButton BasicButtonType="small" onClick={handleSignup}>
              Sign-Up
            </BasicButton>
          </div>
        ) : (
          <div className={styles.logoutBox}>
            <BasicButton BasicButtonType="small" onClick={onLogout}>
              Log-out
            </BasicButton>
            <Link href="/setting" passHref>
              <div className={styles.profileImgBox}>
                <img alt="" crossOrigin="anonymous" height={1} src={`${profilePic}`} width={1} />
              </div>
            </Link>
          </div>
        )}
      </ul>
    </>
  ) : (
    <div />
  );
};

export default Navbar;
