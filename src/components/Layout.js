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
        <div>
          <Head>
            <title>Galerie paris est une photo</title>
          </Head>
          <ScrollToTop smooth className="rounded-full bg-brand-500" />
          <Header menu={menu} translations={translations} />
          {props.children}
          <Footer footer={footer} />
        </div>
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;
