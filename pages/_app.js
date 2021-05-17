import "../src/styles/style.scss";
import "../src/styles/main.scss";

import Router from "next/router";
import NProgress from "nprogress";
import { appWithTranslation } from "next-i18next";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default appWithTranslation(MyApp);
