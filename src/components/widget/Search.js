import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Result } from "../../../pages/recherche";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Search = () => {
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    opened ? disableBodyScroll(document) : enableBodyScroll(document);
  }, [opened]);
  return (
    <div className="relative mx-auto text-gray-600">
      <AnimatePresence>
        {opened && (
          <>
            <motion.div
              onClick={() => setOpened(false)}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 0.25, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
              className="fixed inset-0 z-40 w-screen h-screen bg-black opacity-25"
            ></motion.div>
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              key="search"
              className={`absolute -top-2 z-50 p-2 pr-6 text-sm bg-white rounded-lg right-8 ring-2 ring-brand-500 ring-opacity-25 focus:outline-none`}
              type="search"
              name="search"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </>
        )}
        {opened && searchQuery !== "" && (
          <motion.div
            className="absolute right-0 z-40 px-1 pt-1 overflow-y-scroll bg-white rounded shadow-2xl ring-2 ring-brand-500 ring-opacity-25 top-10"
            style={{
              width: "768px",
              maxWidth: "100vw",
              maxHeight: "calc(100vh - 112px)",
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <QueryResponse search={searchQuery} />
            <div className="sticky bottom-0 px-1 mt-1 bg-white text-brand-500">
              Voir plus
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpened(!opened)}
        className={`transition-all focus:outline-none  transform hover:scale-110`}
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
      </button>
    </div>
  );
};
const fetch = require("@vercel/fetch-retry")(require("node-fetch"));

const fetcher = (url) => fetch(url).then((r) => r.json());

const QueryResponse = ({ search }) => {
  const { locale } = useRouter();
  const { data, error } = useSWR(
    search?.length > 0
      ? `/api/products/?locale=${locale}&search=${search}&first=10`
      : null,
    fetcher
  );
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="error"
        className="p-2"
      >
        <section className="text-gray-600 body-font">
          <div className="flex px-5 py-4 mx-auto">
            <h2 className="w-3/5 mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
              Oups, une erreur est survenu.
            </h2>
            <div className="w-2/5 md:pl-6">
              <div className="flex mt-6 md:mt-4">
                <button className="inline-flex px-4 py-1 text-white border-0 rounded bg-brand-500 focus:outline-none hover:bg-brand-600" aria-label="Essayer sur la page de recherche">
                  Essayer sur la page de recherche
                </button>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    );
  }
  if (!data?.products?.nodes) {
    return (
      <motion.div
        key="loading"
        className="p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className="text-gray-600 body-font">
          <div className="flex items-center px-5 py-4 mx-auto">
            <h2 className="w-3/5 mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
              Chargement des résultats en cour.
            </h2>
            <div className="w-2/5 md:pl-6">
              <div className="flex items-center h-64">
                <motion.div
                  className="w-24 h-24 mx-auto bg-brand-500"
                  animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    );
  }
  // return <div />;
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ul className="flex flex-col space-y-2">
        <Result resList={data.products.nodes} noCol={true} />
        {false &&
          data.products.nodes.map((product) => (
            <li
              className="transition-all transform hover:translate-x-1 hover:text-black"
              key={product.id}
            >
              <Link href={`/galerie-photo/${product.slug}`} passHref>
                <a>{product.name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </motion.div>
  );
};
export default Search;
