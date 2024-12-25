import { Provider } from "react-redux";
import { useStore } from "../store";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Analytics } from '@vercel/analytics/next';

import Head from "next/head";
import "/styles/globals.css";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import * as gtag from "../gtag";
const App = ({ Component, pageProps, router }) => {
  const store = useStore(pageProps.initialReduxState);
  //pagerouter and useEffect added only for google analytics; remove if analytics config changes
  const pagerouter = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    pagerouter.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      pagerouter.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [pagerouter.events]);

  return (
    <Provider store={store}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <title>Algolytica</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Leverage our software's advanced algorithms and real-time data analysis to discover positive expected value scenarios and arbitrage opportunities." />
      </Head>
      <ProtectedRoutes router={router}>
        <Component {...pageProps} />
      </ProtectedRoutes>
      <Analytics />
    </Provider>
  );
};

export default App;
