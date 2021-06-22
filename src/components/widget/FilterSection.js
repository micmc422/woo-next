import { useRouter } from "next/router";
import { TitreWidget } from "../themeComponents";
import { useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import InputRange from "react-input-range";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaChevronLeft } from "react-icons/fa";
import { uniqueId } from "lodash";

const animationParent = {
  initial: { x: 0, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: { x: 0, opacity: 0 },
};
const animationChild = {
  initial: { opacity: 0, x: 75 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 75 },
};
const fetch = require("@vercel/fetch-retry")(require("node-fetch"));

const fetcher = (url) => fetch(url).then((r) => r.json());

const FilterSection = ({ categories, className }) => {
  const { t } = useTranslation("shop");
  return (
    <div
      className={`flex flex-col space-y-4 ${
        className ? className : ""
      } bg-white`}
    >
      <div className="flex flex-col">
        <TitreWidget>{t("categories")}</TitreWidget>
        <BlocCategoriesSelector categories={categories} />
        <BlocPriceRange min={15} max={1000} />
      </div>
    </div>
  );
};
const BlocCategoriesSelector = ({ categories }) => {
  const { t } = useTranslation("shop");
  const router = useRouter();
  const activeCat =
    router?.query?.category?.length > 0
      ? router?.query?.category[0]?.toString()
      : router?.asPath;

  /*
  const { locale } = router;
  const [categoriesList, setCategoriesList] = useState(
    categories.filter((item) =>
      router?.query?.category?.length
        ? item.slug !==
          router?.query?.category[router?.query?.category?.length - 1]
        : true
    )
  );
  const activeCatId = activeCat
    ? categories.find((el) => el.slug === activeCat)?.databaseId
    : router?.query?.category?.length
    ? categories.find((el) => el.slug === router?.query?.category[0])
        ?.databaseId
    : null;
  const { data, error } = useSWR(
    activeCatId
      ? `/api/categorie/?locale=${locale}&parent=${activeCatId}`
      : null,
    fetcher
  );
  */
  const parent = categories[0]?.parent?.node?.name;
  console.log(router?.asPath);
  return (
    <>
      {parent && (
        <Link href={"/galerie-photo"} passHref>
          <motion.a
            key={`fieler-item-retour-nav`}
            className="p-1"
            variants={animationChild}
          >
            <span className="inline-block pl-1 pr-2 text-white transition transform rounded-full bg-brand-500 hover:translate-x-1">
              <span className="flex flex-row items-center py-2 leading-3">
                <FaChevronLeft size="12" />
                <span className="lowercase">
                  {parent ? parent : t("retour")}
                </span>
              </span>
            </span>
          </motion.a>
        </Link>
      )}
      {categories &&
        categories.map((item) => {
          return (
            <Link
              href={item.uri
                .replace("https://photo.paris", "")
                .replace("?lang=en", "")}
              passHref
              key={`fieler-item-${uniqueId(item.name)}`}
            >
              <a
                // onClick={() => updateQuery(item.slug, "categoryIn", router)}
                className="p-1"
              >
                <span
                  className={`relative inline-block  transform hover:scale-110 transition-transform`}
                >
                  {router?.asPath?.includes(item.slug) && (
                    <motion.span
                      layoutId={`isActive-item-filter`}
                      className={`neuromorphism-gray absolute -inset-x-1 inset-y-0 rounded-full`}
                    ></motion.span>
                  )}
                  <motion.span
                    variants={animationChild}
                    className="relative inline-block leading-4"
                  >
                    {item.name}
                  </motion.span>
                </span>
              </a>
            </Link>
          );
        })}
    </>
  );
};

const BlocPriceRange = ({ min, max }) => {
  const { t } = useTranslation("shop");
  const router = useRouter();
  const [values, setValues] = useState(500);
  const [isActive, setIsActive] = useState(false);

  const rangeHandler = (value) => {
    setValues(value);
    isActive
      ? updateQuery(value, "max", router)
      : updateQuery(value, "disablePrice", router);
    //  value.min && updateQuery(value.min, "min", router);
    // value.max && updateQuery(value.max, "max", router);
  };
  return (
    <div className={`py-4`}>
      <TitreWidget>{t("prix")}</TitreWidget>

      <div className={`hidden md:flex flex-row pb-6`}>
        <div className="flex items-center justify-between space-x-1">
          <div
            className={`flex items-center w-8 h-6 p-1 duration-300 ease-in-out  rounded-full transition-all ${
              isActive ? "neuromorphism-green" : "neuromorphism-gray"
            }`}
            onClick={(e) => {
              setIsActive(!isActive);
              updateQuery(values, "disablePrice", router);
            }}
          >
            <div
              className={`w-4 h-4 duration-300 ease-in-out transform bg-white rounded-full shadow-md ${
                isActive ? "translate-x-2" : ""
              }`}
            ></div>
          </div>
          <h2>{t("prix-filter")}</h2>
          <div onClick={() => updateQuery(null, "disablePrice", router)}>
            reset
          </div>
        </div>
      </div>
      <div className={`w-full relative`}>
        {isActive && (
          <form className="form">
            <InputRange
              step={5}
              maxValue={700}
              minValue={25}
              formatLabel={(value) => `${value}€`}
              value={values}
              onChange={(value) => {
                setValues(value);
              }}
              onChangeComplete={(value) => rangeHandler(value)}
            />
          </form>
        )}
      </div>
    </div>
  );
};
const updateQuery = (name, key, router) => {
  const { query } = router;

  const options = { scroll: false, shallow: true };
  let theQuery = query;
  delete theQuery["after"];
  delete theQuery["first"];
  delete theQuery["before"];
  delete theQuery["last"];
  const routerAction = (theQueryAction, path = router.asPath.split("?")[0]) => {
    const formattedQuery = new URLSearchParams(theQueryAction).toString();
    router.replace(
      {
        pathname: path,
        query: formattedQuery,
      },
      null,
      options
    );
  };
  if (key === "categoryIn" && false === name && !theQuery["categoryIn"]) {
    delete theQuery["category"];
    delete theQuery["categoryIn"];
    routerAction(theQuery, "/galerie-photo");
    return null;
  }
  if (key === "categoryIn" && false === name) {
    delete theQuery["categoryIn"];
    routerAction(theQuery);
    return null;
  }
  if (false === name) {
    delete theQuery[key];
    routerAction(theQuery);
    return;
  }
  if (key === "disablePrice") {
    delete theQuery["disablePrice"];
    delete theQuery["min"];
    delete theQuery["max"];
    routerAction(theQuery);
    return;
  }
  if (theQuery[key] && theQuery[key] !== "disablePrice") {
    if (key === "min" || key === "max") {
      // theQuery[key] = theQuery[key].split(",").filter((el) => el && el !== "");
      if (key !== "slug") theQuery[key] = name;
      routerAction(theQuery);
    } else {
      if (name !== theQuery[key]) {
        theQuery[key] = name;
        routerAction(theQuery);
      } else {
        delete theQuery[key];
        routerAction(theQuery);
      }

      routerAction(theQuery);
      return;
    }
  } else {
    theQuery[key] = name;
    routerAction(theQuery);
  }
};

export default FilterSection;
