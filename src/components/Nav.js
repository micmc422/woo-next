import Link from "next/link";
import CartIcon from "./cart/CartIcon";
import { useState } from "react";
import { useRouter } from "next/router";
import ContentParser from "./ContentParser";
import { domToReact } from "html-react-parser";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "@headlessui/react";
import { Bouton, ChevronToBot } from "./themeComponents";
import { uniqueId } from "lodash";
import { useTranslation } from "react-i18next";
import Search from "./widget/Search";
import { HiOutlinePhoneOutgoing } from "react-icons/hi";
import { Spin as Hamburger, Spin } from "hamburger-react";
import CouponsNav from "./widget/CouponsNav";

const Nav = ({ menu, translations, sticky, coupons }) => {
  const router = useRouter();
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const { t } = useTranslation("common");
  const [isOpen, setOpen] = useState(false);
  // return <ContentParser data={menu} options={defaultOptions}></ContentParser>;
  /*
    //TODO attente de correction du bug graphQL WPML
    translations && translations[0]
    ? translations[0].href.replace(/^http(s):\/\/photo.paris/i, "")
    : !router.asPath.includes("/galerie-photo/")
    ? router.asPath
    : "/galerie-photo/"
  */
  // console.log(coupons);
  return (
    <nav className="z-30 bg-white">
      {!sticky && (
        <div className="py-1 text-gray-100 bg-gray-900 md:px-4 ">
          <div className="container flex flex-row items-center justify-between px-4 mx-auto">
            <div
              className={`transform hover:translate-x-1 transition-transform`}
            >
              <a href="tel:+33156920447" className="flex flex-row items-center">
                <span className={`pr-1 -mt-px`}>
                  <HiOutlinePhoneOutgoing />
                </span>
                <span className="hidden md:block">01 56 92 04 47</span>
              </a>
            </div>
            <div className={`flex flex-row items-center`}>
              <CouponsNav coupons={coupons} />
            </div>
            <Link
              href={"/galerie-photo/"}
              locale={router.locale === "fr" ? "en" : "fr"}
              passHref
            >
              <a className="flex flex-row items-center w-5 h-5 transition-transform transform hover:scale-110">
                {router.locale === "fr" ? <FlagFr /> : <FlagEn />}
              </a>
            </Link>
          </div>
        </div>
      )}
      <div
        className={`container flex flex-wrap items-center justify-between px-4 mx-auto ${
          sticky ? "py-0" : "py-4"
        }`}
      >
        <div className="flex items-center flex-shrink-0 mr-20 text-black">
          <Link href="/">
            <a>
              <Image
                src={"/logo@2x.png"}
                width={sticky ? 120 * 0.75 : 120}
                height={sticky ? 50 * 0.75 : 50}
                alt="Paris est une photo"
              />
            </a>
          </Link>
        </div>

        {/*Menu button*/}
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuVisibility(!isMenuVisible)}
            className="flex items-center p-1 text-black focus:outline-none"
          >
            <Spin
              toggled={isOpen}
              toggle={setOpen}
              size={20}
              label="ouvrir le menu"
            />
          </button>
        </div>
        <AnimatePresence>
          {isMenuVisible && (
            <MobileMenuBaseLvl
              {...menu}
              setMenuVisibility={setMenuVisibility}
            />
          )}
        </AnimatePresence>

        {/*MMenu in mobile*/}
        <div
          className={`w-full lg:h-full flex-grow hidden lg:flex lg:items-center lg:w-auto overflow-hidden  md:overflow-visible`}
        >
          <div className="relative flex flex-col text-sm font-medium uppercase md:flex-row lg:flex-grow">
            <AnimatePresence exitBeforeEnter>
              <MenuBaseLvl {...menu} />
            </AnimatePresence>
          </div>

          <div className="flex flex-row space-x-4 text-sm font-medium">
            <Search />
            <div className="block mt-4 mr-10 text-black transition-transform transform lg:inline-block lg:mt-0 hover:text-black hover:scale-110">
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
const MenuBaseLvl = ({ base, collection }) => {
  return base ? (
    base.map(({ label, title, url }) => {
      let formattedUrl = url?.replace("https://photo.paris/", "/");
      const isMegaMenu = formattedUrl.includes("megamenu=collection");
      formattedUrl = isMegaMenu ? "/galerie-photo" : formattedUrl;
      // return <MegaMenu collection={collection} />; {label || title}
      return isMegaMenu ? (
        <Menu key={uniqueId("label-menu-")}>
          <div className="hidden md:block">
            <Menu.Button>
              <div className="flex flex-row items-center px-4 py-1 text-gray-500 hover:text-gray-900">
                <div className="pt-1 font-semibold text-left">
                  {label || title}
                </div>
                <div className="hidden md:block">
                  <ChevronToBot />
                </div>
              </div>
            </Menu.Button>
          </div>
          <div className="flex flex-row items-center px-4 py-1 text-gray-500 md:hidden hover:text-gray-900">
            <Link href={formattedUrl} passHref>
              <a className="pt-1 font-semibold text-left">{label || title}</a>
            </Link>
          </div>
          <Menu.Items>
            <MegaMenu collection={collection} />
          </Menu.Items>
        </Menu>
      ) : (
        <Menu key={uniqueId("label-menu-")}>
          <Menu.Items static>
            <Menu.Item>
              <Link href={formattedUrl} passHref>
                <a className="flex flex-row items-center px-4 py-1 text-gray-500 hover:text-gray-900">
                  <div className="pt-1 font-semibold">{label || title}</div>
                </a>
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      );
    })
  ) : (
    <div />
  );
};

const MobileMenuBaseLvl = ({ base, setMenuVisibility }) => {
  const animationParent = {
    initial: { height: 0 },
    animate: {
      height: "auto",
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      height: 0,
      transition: {
        staggerChildren: 0.01,
        when: "afterChildren",
      },
    },
  };
  const animationChild = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, scale: 0 },
  };
  return base ? (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationParent}
      className="relative flex w-full overflow-hidden lg:hidden"
    >
      <ul className="flex flex-col flex-grow w-full py-6 space-y-2 ">
        {base.map(({ label, title, url }) => {
          let formattedUrl = url?.replace("https://photo.paris/", "/");
          const isMegaMenu = formattedUrl.includes("megamenu=collection");
          formattedUrl = isMegaMenu ? "/galerie-photo" : formattedUrl;
          return (
            <motion.li
              key={url}
              variants={animationChild}
              className="inline-block m-auto text-center"
              onClick={() => setMenuVisibility(false)}
            >
              <Link href={formattedUrl} passHref>
                <a className="px-0 py-1">{label || title}</a>
              </Link>
            </motion.li>
          );
        })}
      </ul>
      <div className="flex flex-col w-8 py-6 mr-3 justify-evenly">
        <Link href="/recherche">
          <motion.div
            variants={animationChild}
            onClick={() => setMenuVisibility(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
        </Link>
        <motion.div variants={animationChild}>
          <CartIcon onClick={() => setMenuVisibility(false)} />
        </motion.div>
      </div>
    </motion.div>
  ) : (
    <div />
  );
};

const MegaMenu = ({ collection }) => {
  return (
    <Menu.Item>
      <motion.div
        key="collection-megamenu"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="absolute left-0 z-50 max-w-screen-lg px-8 bg-gray-100 top-8 w-max"
      >
        <div className="relative">
          <ContentParser data={collection} options={defaultOptions} />
        </div>
      </motion.div>
    </Menu.Item>
  );
};
const FlagFr = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="flag-icon-css-gb"
    viewBox="0 0 640 480"
  >
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path
      fill="#FFF"
      d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
    />
    <path
      fill="#C8102E"
      d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
    />
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
  </svg>
);

const FlagEn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="flag-icon-css-fr"
    viewBox="0 0 640 480"
  >
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path fill="#00267f" d="M0 0h213.3v480H0z" />
      <path fill="#f31830" d="M426.7 0H640v480H426.7z" />
    </g>
  </svg>
);

export default Nav;

const defaultOptions = {
  replace: ({ attribs, children, name }) => {
    if (!attribs) {
      return;
    }
    if (name === "a") {
      const arrayHref = attribs.href
        ?.replace("https://photo.paris", "")
        .split("?lang=");
      const href = arrayHref[0];
      const lang = arrayHref[1];
      if (attribs?.class?.includes("block-link")) {
        return (
          <Link href={href} locale={lang ? lang : "fr"} passHref>
            <a className="relative block p-1 pt-2 mx-2 rounded-lg whitespace-nowrap">
              <Bouton small={true} circleClass="neuromorphism-brand">
                <span className="inline-block">
                  {domToReact(children, defaultOptions)}
                </span>
              </Bouton>
            </a>
          </Link>
        );
      }
      return (
        <Link href={href} locale={lang ? lang : "fr"} passHref>
          <a className="relative">{domToReact(children, defaultOptions)}</a>
        </Link>
      );
    }
    if (name === "figure") {
      return (
        <div className="relative">
          <div
            className={`hidden md:absolute left-2 top-2 -bottom-2 -right-2 -mr-2 bg-gray-200`}
          >
            {" "}
          </div>
          <div className="relative">
            {" "}
            {domToReact(children, defaultOptions)}
          </div>
        </div>
      );
    }
    if (name === "img") {
      return (
        <div className="relative w-full transition-transform duration-300 h-36 hover:scale-105 transform-gpu">
          <Image
            src={attribs["data-src"]}
            layout="fill"
            objectFit="cover"
            alt={attribs.alt}
          />
        </div>
      );
    }
    if (name === "h3") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <h2
          className={`mx-auto py-8 text-xl max-w-2xl normal-case ${
            alignRigth ? "text-right" : ""
          }`}
        >
          {domToReact(children, defaultOptions)}
        </h2>
      );
    }
    if (name === "h4") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <h3
          className={`mx-auto py-8 text-2xl max-w-2xl ${
            alignRigth ? "text-right" : ""
          }`}
        >
          {domToReact(children, defaultOptions)}
        </h3>
      );
    }
    if (name === "p") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <div
          className={`mx-auto prose normal-case p-2 ${
            alignRigth ? "text-right" : ""
          }`}
        >
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (
      attribs?.class?.includes("vc_row") ||
      attribs?.class?.includes("wpb_row")
    ) {
      return (
        <div className="container relative flex flex-col items-center w-full max-w-screen-xl mx-auto md:flex-row md:space-x-4">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (attribs?.class?.includes("ciloe-banner")) {
      return (
        <Menu.Item>
          <div>{domToReact(children, defaultOptions)}</div>
        </Menu.Item>
      );
    }
    if (attribs?.class?.includes("vc_btn")) {
      const { href, target, title } = attribs;
      const parsedHref = href?.replace("https://photo.paris", "");

      return parsedHref ? (
        <a
          href={parsedHref}
          className="relative flex flex-row items-center mx-auto space-x-2 text-2xl w-max"
        >
          {domToReact(children, defaultOptions)}
        </a>
      ) : (
        <div className="relative flex flex-row items-center mx-auto space-x-2 text-2xl">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (attribs?.class?.includes("wpb_column")) {
      return (
        <div
          className={`${
            attribs?.class.includes("vc_col-sm-2")
              ? "w-1/6"
              : attribs?.class.includes("vc_col-sm-3")
              ? "md:w-1/4"
              : attribs?.class.includes("vc_col-sm-4")
              ? "w-1/3"
              : attribs?.class.includes("vc_col-sm-6")
              ? "w-1/2 flex-shrink"
              : attribs?.class.includes("vc_col-sm-8")
              ? "w-8/12"
              : attribs?.class.includes("vc_col-sm-9")
              ? "w-3/4"
              : attribs?.class.includes("vc_col-sm-12")
              ? "w-full"
              : "w-full"
          }
    `}
        >
          {domToReact(children, defaultOptions)}
        </div>
      );
    }

    return <>{domToReact(children, defaultOptions)}</>;
  },
};
