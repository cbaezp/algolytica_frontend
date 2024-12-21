import { Provider } from "react-redux";
import { useStore } from "../store";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
        <title>Odds73</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ProtectedRoutes router={router}>
        <Component {...pageProps} />
      </ProtectedRoutes>
    </Provider>
  );
};

export default App;
