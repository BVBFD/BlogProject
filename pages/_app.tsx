import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { store } from '../redux/user';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </PersistGate> */}
    </Provider>
  );
}
