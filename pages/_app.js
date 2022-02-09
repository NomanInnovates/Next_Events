import Head from "next/head";
import "../styles/Globals.css";
import Layout from "../components/layout/Layout";

import { NotificationContextProvider } from "../store/NotificationContext";
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta
            name="viewport"
            content="initial-scale=1.0 width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
