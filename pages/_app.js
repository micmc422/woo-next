import "../src/styles/style.scss";
import "../src/styles/main.scss";

import Router from "next/router";
import NProgress from "nprogress";
import { appWithTranslation } from "next-i18next";
import { CookiesProvider } from "react-cookie";

const contextLayout = {
  mobileMenuopen: false,
};

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}
export default appWithTranslation(MyApp);
