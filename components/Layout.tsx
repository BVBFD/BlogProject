import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '3rem' }}>{children}</div>
    </>
  );
};

export default Layout;
