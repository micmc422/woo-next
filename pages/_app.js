import "../src/styles/style.scss";
import "../src/styles/main.scss";

import Router from "next/router";
import NProgress from "nprogress";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default appWithTranslation(MyApp);
