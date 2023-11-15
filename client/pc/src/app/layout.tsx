import type { Metadata } from 'next';
import { didot } from 'src/common/font/font';
import './globals.css';
import { homeMeta } from 'src/common/meta/meta';

import { ThemeContextProvider } from 'src/common/context/ThemeContext';
import { PopUpProvider } from 'src/common/context/UsePopUp';
import AuthProvider from 'src/common/context/AuthProvider';

import Navbar from '../components/Navbar/Navbar';

export const metadata: Metadata = homeMeta;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={didot.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <PopUpProvider>
              <div className="container">
                <Navbar />
                {children}
              </div>
            </PopUpProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
