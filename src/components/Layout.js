import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import { AnimateSharedLayout } from "framer-motion";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  const { menu } = props;
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <div>
          <Head>
            <title>Woocommerce React Theme</title>
          </Head>
          <Header menu={menu} />
          <AnimateSharedLayout type="crossfade">
            {props.children}
          </AnimateSharedLayout>
          <Footer />
        </div>
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;
