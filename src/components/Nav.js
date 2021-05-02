import Link from "next/link";
import CartIcon from "./cart/CartIcon";
import { useState } from "react";
import { useRouter } from "next/router";

const Nav = ({}) => {
  const router = useRouter();
  const [isMenuVisible, setMenuVisibility] = useState(false);
  // console.log(router);
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
            <Link href="/galerie-photo">
              <a className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black">
                Galerie
              </a>
            </Link>
            <Link href="/">
              <a className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black">
                Women
              </a>
            </Link>
            <Link href="/">
              <a className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black">
                Kids
              </a>
            </Link>
            <Link href="/">
              <a className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black">
                Home & Living
              </a>
            </Link>
            <Link href="/">
              <a className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black">
                Offers
              </a>
            </Link>
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
