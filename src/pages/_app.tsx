import Spin from '@/common/Spin';
import { PopUpProvider } from '@/common/UsePopUp';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Spin />
      <PopUpProvider>
        <Component {...pageProps} />
      </PopUpProvider>
    </>
  );
}
