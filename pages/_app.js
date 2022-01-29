import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Notification from "../components/notification/notification";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0 width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Notification title="test" message="This is a test" status="pending" />
    </Layout>
  );
}

export default MyApp;
