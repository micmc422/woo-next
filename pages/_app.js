import "../src/styles/style.scss";
import "../src/styles/main.scss";
import "tailwindcss/tailwind.css";

import Router from "next/router";
import NProgress from "nprogress";
import { appWithTranslation } from "next-i18next";
import CookieConsent from "react-cookie-consent";

NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CookieConsent
        buttonText="OK"
        buttonStyle={{
          background: "#f5cc26",
          color: "#fff",
          fontSize: "13px",
          borderRadius: "50px",
        }}
        containerClasses="bg-gray-900"
        contentClasses="container mx-auto"
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Component {...pageProps} />
    </>
  );
}
export default appWithTranslation(MyApp);
