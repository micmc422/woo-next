import "../src/styles/style.scss";
import "../src/styles/main.scss";

import Router from "next/router";
import NProgress from "nprogress";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { AnimateSharedLayout } from "framer-motion";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => (
  <AnimateSharedLayout type="crossfade">
    <Component {...pageProps} />
  </AnimateSharedLayout>
);

export default appWithTranslation(MyApp);
