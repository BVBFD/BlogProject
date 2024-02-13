import Navbar from '../Navbar';
import styles from './index.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className={styles.layout}>{children}</div>
    </>
  );
};

export default Layout;
