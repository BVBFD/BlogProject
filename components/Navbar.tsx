import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { GitHub } from '@mui/icons-material';

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
