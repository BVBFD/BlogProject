import type { Metadata } from 'next';
import { didot } from 'src/common/font/font';
import './globals.css';
import { ThemeContextProvider } from 'src/common/context/ThemeContext';
import { homeMeta } from 'src/common/meta/meta';

import Navbar from '../components/Navbar/Navbar';
// import PopUp from 'src/common/PopUp/PopUp';

export const metadata: Metadata = homeMeta;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={didot.className}>
        <ThemeContextProvider>
          <div className="container">
            <Navbar />
            {children}
            {/* <PopUp title={'test'} content={'test'} /> */}
          </div>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
