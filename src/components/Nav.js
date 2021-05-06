import Link from "next/link";
import CartIcon from "./cart/CartIcon";
import { useState } from "react";
import { useRouter } from "next/router";
import ContentParser from "./ContentParser";
import { domToReact } from "html-react-parser";

const defaultOptions = {
  replace: ({ attribs, children, name }) => {
    if (!attribs) {
      return;
    }
    if (name === "figure") {
      return (
        <div className="relative">
          <div
            className={`absolute left-8 top-8 -bottom-8 -right-8 -mr-2 bg-gray-200`}
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
    if (name === "i" && attribs?.class?.includes("fa-instagram")) {
      return (
        <>
          <div
            style={{ backgroundColor: "#c13584", zIndex: -1 }}
            className={`absolute inset-0 -mr-2 rounded-md ring-2 ring-red-800 ring-opacity-40`}
          ></div>
          <FiInstagram />
        </>
      );
    }
    if (name === "i" && attribs?.class?.includes("fa-facebook")) {
      return (
        <>
          {" "}
          <div
            style={{ backgroundColor: "#3b5998", zIndex: -1 }}
            className={`absolute inset-0 -mr-2 rounded-md ring-2 ring-blue-800 ring-opacity-40`}
          ></div>
          <FiFacebook />
        </>
      );
    }
    if (name === "h3") {
      const alignRigth = attribs?.style === "text-align: right;";
      return (
        <h2
          className={`mx-auto py-8 text-xl max-w-2xl ${
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
        <p className={`mx-auto prose ${alignRigth ? "text-right" : ""}`}>
          {domToReact(children, defaultOptions)}
        </p>
      );
    }

    if (
      attribs?.class?.includes("vc_row") ||
      attribs?.class?.includes("wpb_row")
    ) {
      return (
        <div className="container flex flex-row items-center max-w-screen-xl mx-auto space-x-12">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (attribs?.class?.includes("vc_column-inner")) {
      return (
        <div className="pb-16">{domToReact(children, defaultOptions)}</div>
      );
    }
    if (attribs?.class?.includes("vc_btn")) {
      console.log(attribs);
      const { href, target, title } = attribs;

      return href ? (
        <a
          href={href}
          className="relative flex flex-row items-center mx-auto space-x-2 text-2xl text-gray-200"
        >
          {domToReact(children, defaultOptions)}
        </a>
      ) : (
        <div className="relative flex flex-row items-center mx-auto space-x-2 text-2xl text-gray-200">
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
    if (
      attribs?.class?.includes("wpb_column") ||
      attribs?.class?.includes("vc_column_container")
    ) {
      return (
        <div
          className={`${
            attribs?.class.includes("vc_col-sm-3") ? "w-1/4" : ""
          } ${attribs?.class.includes("vc_col-sm-4") ? "w-1/3" : ""} ${
            attribs?.class.includes("vc_col-sm-6") ? "w-1/2 flex-shrink" : ""
          } ${attribs?.class.includes("vc_col-sm-8") ? "w-8/12" : ""} ${
            attribs?.class.includes("vc_col-sm-9") ? "w-3/4" : ""
          } ${attribs?.class.includes("vc_col-sm-12") ? "w-full" : " "}
    `}
        >
          {domToReact(children, defaultOptions)}
        </div>
      );
    }
  },
};

const Nav = ({ menu }) => {
  const router = useRouter();
  const [isMenuVisible, setMenuVisibility] = useState(false);
  console.log(menu);
  // return <ContentParser data={menu} options={defaultOptions}></ContentParser>;
  return (
    <nav className="bg-white">
      <div className="flex flex-row justify-between px-4 py-1 text-gray-100 bg-gray-900">
        <div>contact</div>
        <div>annonce</div>
        <div
          className="self-end w-5 h-5"
          onClick={() => {
            router.push(router.pathname, router.pathname, {
              locale: router.locale === "fr" ? "en" : "fr",
            });
          }}
        >
          <span> {router.locale === "fr" ? <FlagFr /> : <FlagEn />}</span>
        </div>
      </div>
      <div className="container flex flex-wrap items-center justify-between p-4 mx-auto">
        <div className="flex items-center flex-shrink-0 mr-20 text-black">
          <svg
            className="w-8 h-8 mr-2 fill-current"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="text-xl font-semibold tracking-tight">
            <Link href="/">
              <a className="">WooNext</a>
            </Link>
          </span>
        </div>

        {/*Menu button*/}
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuVisibility(!isMenuVisible)}
            className="flex items-center px-3 py-2 text-black border border-black rounded hover:text-black hover:border-black"
          >
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/*MMenu in mobile*/}
        <div
          className={`${
            isMenuVisible ? "max-h-full h-full" : "h-0"
          } w-full overflow-hidden lg:h-full flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm font-medium uppercase lg:flex-grow">
            <MenuBaseLvl {...menu} />
          </div>

          <div className="text-sm font-medium">
            <a
              href="#responsive-header"
              className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden m-auto lg:block"
                fill="none"
                viewBox="0 0 24 24"
                width="18"
                height="auto"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden m-auto lg:block"
                fill="none"
                viewBox="0 0 24 24"
                width="18"
                height="auto"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Wishlist
            </a>
            <CartIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};
const MenuBaseLvl = ({ base, collection }) => {
  console.log({ base, collection });

  return base ? (
    base.map(({ label, title, url }) => {
      let formattedUrl = url.replace("https://photo.paris", "");
      formattedUrl = formattedUrl.includes("megamenu=collection")
        ? "galerie-photo"
        : formattedUrl;
      return (
        <Link href={formattedUrl}>
          <a className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black">
            {label}
          </a>
        </Link>
      );
    })
  ) : (
    <div />
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
