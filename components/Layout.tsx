import Navbar from './Navbar';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <Navbar />
      <div className={styles.layout}>{children}</div>
    </>
  );
};

export default Layout;
