import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { Result } from "../../../pages/recherche";

const Search = () => {
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
          <>
            <motion.div
              className="absolute right-0 z-40 w-screen max-w-screen-sm p-1 bg-white rounded ring-2 ring-brand-500 ring-opacity-25 top-10 max-h-96 overflow-y-scroll shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <QueryResponse search={searchQuery} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpened(!opened)}
        className={`transition-all focus:outline-none`}
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
      <div className="absolute right-0 w-full h-24 p-2 bg-red-500 top-12">
        Erreur...
      </div>
    );
  }
  if (!data?.products?.nodes) {
    return (
      <div className="absolute right-0 w-full h-24 p-2 bg-red-500 top-12">
        Loading...
      </div>
    );
  }
  return (
    <div>
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
    </div>
  );
};
export default Search;
