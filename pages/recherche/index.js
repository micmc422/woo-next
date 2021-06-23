import { useEffect, useState } from "react";
import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import InputField from "../../src/components/checkout/form-elements/InputField";
import ImageWithFallback from "../../src/components/ImageFallBack";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import getMenu from "../../src/get-menu-fallback";
import client, { clientEng } from "../../src/components/ApolloClient";
import { GET_CATEGORIES_LIST } from "../../src/queries/get-categories";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "../../next-i18next.config";
import { Bouton } from "../../src/components/themeComponents";
import { uniqueId } from "lodash";
import * as ga from '../../src/lib/ga'

const fetcher = (url) => fetch(url).then((r) => r.json());

const Recherche = ({ menu, cat }) => {
  return (
    <Layout menu={menu}>
      <div className="container w-full px-4 mx-auto my-16 ">
        <h1 className="mb-5 text-4xl font-black uppercase md:text-6xl">
          Recherche
        </h1>
        <SearchContainer cat={cat} />
      </div>
    </Layout>
  );
};
const loadingAnimation = {
  isLoading: { opacity: [1, 0.5, 1] },
  loaded: { opacity: 1 },
};
const SearchContainer = ({ cat }) => {
  const router = useRouter();
  const { search } = router.query;
  const { locale } = useRouter();
  const [result, setResult] = useState(null);
  const { data, error } = useSWR(
    search?.length > 0
      ? `/api/products/?locale=${locale}&search=${search}`
      : null,
    fetcher
  );
  const handleOnChange = (event) => {
    const { target } = event || {};
    router.query.search = target.value;
    router.replace(router);
    ga.event({
      label: target.value,
      action: "search",
      value: target.value,
    });
  };
  const isLoading = !data && !error && search?.length > 0;
  useEffect(() => {
    if (data?.products?.nodes?.length > 0) {
      setResult(data?.products?.nodes);
    } else {
      setResult(null);
    }
  }, [data]);
  return (
    <div className="flex flex-col space-y-8">
      <InputField
        name="search"
        inputValue={search}
        handleOnChange={handleOnChange}
        label="Votre recherche"
        // errors={errors}
        // isShipping={isShipping}
        className="w-full mx-auto sm:my-2 sm:px-2 md:w-1/2"
      />
      <motion.div
        initial="loaded"
        animate={isLoading ? "isLoading" : "loaded"}
        variants={loadingAnimation}
      >
        <AnimatePresence exitBeforeEnter>
          {result?.length > 0 ? (
            <Result resList={result} />
          ) : search?.length > 0 && !isLoading ? (
            <NoResult cat={cat} />
          ) : (
            <div>Saissiez votre requête</div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const NoResult = ({ cat }) => {
  return (
    <motion.section
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
      className="text-gray-600 body-font"
    >
      <div className="container flex flex-wrap items-center px-5 py-24 mx-auto">
        <div className="pb-10 mb-10 border-b border-gray-200 md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 md:mb-0">
          <h1 className="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Aucun résultat :s
          </h1>
          <p className="text-base leading-relaxed">
            Essayer d'explorer nos catégories, ou essayer différents mots cléfs.
          </p>
          <div className={`flex flex-row space-x-8`}>
            <a className="inline-flex items-center mt-4 text-brand-500">
              Accueil
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <a className="inline-flex items-center mt-4 text-brand-500">
              Encadrement
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 md:pl-12">
          <h2 className="mb-3 text-sm font-semibold tracking-wider text-gray-800 title-font">
            CATEGORIES
          </h2>
          <nav className="flex flex-wrap -mb-1 list-none">
            {cat.map(({ name, slug }) => {
              return (
                <li className="w-1/2 mb-1 lg:w-1/3" key={uniqueId(slug)}>
                  <Link href={`/categorie/${slug}`} passHref>
                    <a className="text-gray-600 hover:text-gray-800">{name}</a>
                  </Link>
                </li>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.section>
  );
};
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -100 },
  show: { opacity: 1, y: 0 },
};

export const Result = ({ resList, noCol = false }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`grid ${
        noCol
          ? "grid-cols-1"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      } gap-4`}
    >
      {resList.map((item) => (
        <ResItem {...item} />
      ))}
    </motion.div>
  );
};
const ResItem = ({
  name,
  image,
  price,
  slug,
  averageRating,
  galleryImages,
  reviewCount,
  productCategories,
}) => {
  const orientation = galleryImages?.nodes[0]
    ? galleryImages?.nodes[0].mediaDetails.width >
      galleryImages?.nodes[0].mediaDetails.height
      ? "cover"
      : "contain"
    : image?.mediaDetails &&
      image.mediaDetails.width > image.mediaDetails.height
    ? "cover"
    : "contain";
  const imageUrlPrimaire = galleryImages?.nodes[0]
    ? galleryImages?.nodes[0].mediaItemUrl
    : image?.sourceUrl;

  return (
    <motion.div variants={item}>
      <Link href={`/galerie-photo/${slug}`} passHref>
        <a
          className={`flex flex-row items-center space-x-4 cursor-pointer transform hover:shadow-xl transition-all rounded bg-gray-100 shadow overflow-hidden`}
        >
          <div className={`relative w-24 self-stretch flex-shrink-0`}>
            <ImageWithFallback
              src={imageUrlPrimaire}
              slug={slug}
              alt={name}
              layout="fill"
              objectfit={"cover"}
            />
          </div>
          <div className="flex-grow py-1">
            <Bouton>
              <h2 className="pb-2 leading-4 text-gray-800">{name}</h2>
            </Bouton>
            <div className="relative flex -mx-1 justify-items-end flex-nowrap">
              <div className="flex flex-wrap flex-grow flex-shrink">
                {productCategories?.nodes?.map(({ name, slug, uri }) => (
                  <Link href={uri.replace("https://photo.paris")} passHref>
                    <a className="px-1 m-px text-xs text-gray-400 transition-all rounded-full hover:shadow bg-gray-50">
                      {name}{" "}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col self-end flex-shrink-0 pr-1">
                <div className="text-sm text-right text-blue-400">{price}</div>
                <StarComp
                  averageRating={averageRating}
                  reviewCount={reviewCount}
                />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
};

const StarComp = ({ averageRating, reviewCount }) => {
  const arrrayOfStar = new Array(5).fill("");
  return (
    averageRating !== 0 && (
      <span className="flex flex-col items-end">
        <span className="flex items-center text-right">
          {arrrayOfStar.map((star, i) => {
            return i < averageRating ? (
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-brand-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-brand-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            );
          })}
        </span>
        <span className="ml-3 text-xs leading-3 text-gray-300">
          {reviewCount} vote{reviewCount > 1 ? "s" : ""}
        </span>
      </span>
    )
  );
};
export default Recherche;

export async function getStaticProps({ locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: GET_CATEGORIES_LIST,
  });

  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      menu,
      cat: data?.productCategories.nodes,
      ...(await serverSideTranslations(
        locale,
        ["shop", "common"],
        nextI18nextConfig
      )),
    },
    revalidate: 86400,
  };
}
