import type { Metadata } from 'next';
import { didot } from '../../../common/src/font/font';
import './globals.css';

import { homeMeta } from '../../../common/src/meta/meta';

export const metadata: Metadata = homeMeta;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={didot.className}>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
