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
export function reportWebVitals(metric) {
  console.log(metric)
}

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
          boxShadow: "1px 0px 3px #9CA3AF",
        }}
        style={{
          background: "#fff",
          color: "#000",
          border: "1px #D1D5DB",
          borderRadius: ".5rem",
          margin: ".5rem",
          boxShadow: "1px 0px 8px #4B5563",
          width: "calc(100% - 2rem)",
          maxWidth: "800px",
          left: "calc(50% - .5rem - 1px)",
          transform: "translateX(-50%)",
        }}
        // containerClasses="bg-gray-900"
        contentClasses="container mr-1 w-full"
      >
        <div className="" style={{ maxWidth: "calc(100% - 3rem)" }}>
          This website uses cookies to enhance the user experience.
        </div>
      </CookieConsent>
      <Component {...pageProps} />
    </>
  );
}
export default appWithTranslation(MyApp);
