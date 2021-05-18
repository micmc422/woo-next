import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

const Search = () => {
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative h-10 pt-2 mx-auto text-gray-600">
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
              className="relative z-50 h-10 px-5 pr-16 text-sm bg-white rounded-lg ring-2 ring-yellow-500 ring-opacity-25 focus:outline-none"
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
              className="absolute right-0 z-40 w-64 p-2 bg-white rounded top-14 ring-2 ring-yellow-500 ring-opacity-25"
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
        className={`absolute mt-5 mr-4 transition-all focus:outline-none ${
          opened ? "top-0 right-0" : "-top-2 right-0 pr-5"
        }`}
      >
        <svg
          className="w-4 h-4 text-gray-600 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          xmlSpace="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
        {!opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="search-text"
            className="absolute right-0 -bottom-8"
          >
            Chercher
          </motion.div>
        )}
      </button>
      <AnimatePresence></AnimatePresence>
    </div>
  );
};
const fetcher = (url) => fetch(url).then((r) => r.json());

const QueryResponse = ({ search }) => {
  console.log(search);
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
  if (!data) {
    return (
      <div className="absolute right-0 w-full h-24 p-2 bg-red-500 top-12">
        Loading...
      </div>
    );
  }
  console.log(data);
  return (
    <div>
      <ul className="flex flex-col space-y-2">
        {data.products.nodes.map((product) => (
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
