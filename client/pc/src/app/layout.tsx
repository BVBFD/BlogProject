import type { Metadata } from 'next';

import { didot } from '@common/src/font/font';
import './globals.css';

import { ThemeContextProvider } from '@common/src/context/ThemeContext';
import { homeMeta } from '@common/src/meta/meta';

import Navbar from '../components/Navbar/Navbar';

export const metadata: Metadata = homeMeta;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={didot.className}>
        <ThemeContextProvider>
          <div className="container">
            <Navbar />
            {children}
          </div>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
