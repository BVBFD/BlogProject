import Spin from '@/common/Spin';
import { PopUpProvider } from '@/common/UsePopUp';
import Layout from '@/components/Layout';
import { persistor, store } from '@/redux/user';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Spin />
      <Provider store={store}>
        <PopUpProvider>
          <PersistGate persistor={persistor}>
            {() => (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </PersistGate>
        </PopUpProvider>
      </Provider>
    </>
  );
}
