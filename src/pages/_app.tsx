import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import Layout from 'src/components/Layouts/Layout';
import '../styles/index.css';
import { Provider } from 'react-redux';
import { store } from 'src/states/store';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  // console.log('_app pageProps====', pageProps);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
