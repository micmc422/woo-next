import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import ScrollToTop from "react-scroll-to-top";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  const { menu, translations, footer } = props;
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <div className={`relative`}>
          <Head>
            <title>Galerie paris est une photo</title>
          </Head>
          <ScrollToTop
            smooth
            className="fixed z-40 w-12 h-12 p-1 text-white rounded-full bg-brand-500 bottom-12 right-12 focus:outline-none"
            component={<ArrowSvg />}
          />
          <Header menu={menu} translations={translations} />
          {props.children}
          <Footer footer={footer} />
        </div>
      </ApolloProvider>
    </AppProvider>
  );
};

const ArrowSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
      />
    </svg>
  );
};
export default Layout;
