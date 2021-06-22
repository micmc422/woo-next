import Head from "next/head";
import { AppProvider } from "./context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import client from "./ApolloClient";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import ScrollToTop from "react-scroll-to-top";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  const { menu, translations, footer, coupons, legal } = props;
  const { scrollY } = useViewportScroll();
  const [height, setHeight] = useState(300);
  const ref = useRef(null);
  const y1 = useTransform(scrollY, [0, height], [0, 400]);
  const y2 = useTransform(scrollY, [0, height], [400, 0]);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <div className={`relative`} ref={ref}>
          <Head>
            <title>Galerie paris est une photo</title>
            <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          </Head>
          <ScrollToTop
            smooth
            className="fixed z-40 w-8 h-8 p-1 text-white rounded-full md:w-12 md:h-12 neuromorphism-brand bottom-6 md:bottom-12 right-6 md:right-12 focus:outline-none"
            component={<ArrowSvg />}
          />
          <Header menu={menu} translations={translations} coupons={coupons} />
          <motion.div
            style={{
              y: y1,
              x: 50,
              width: "10%",
              height: "30vh",
              opacity: 0.05,
            }}
            className="fixed inset-0 flex items-center justify-center"
          >
            <Image
              src="/logo_black_old.png"
              layout="fill"
              objectFit="contain"
              alt="paris est une photo logo filigrane"
            />
          </motion.div>
          {props.children}
          <Footer footer={footer} legal={legal} />
        </div>
      </ApolloProvider>
    </AppProvider>
  );
};

const ArrowSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 md:w-10 md:h-10"
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
