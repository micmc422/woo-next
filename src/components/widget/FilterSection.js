import { useRouter } from "next/router";
import { TitreWidget } from "../themeComponents";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";

import InputRange from "react-input-range";
import Link from "next/link";

const animationParent = {
  initial: { x: 0, opacity: 0 },
  isVisible: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  isHidden: { x: 0, opacity: 0 },
};
const animationChild = {
  initial: { opacity: 0, x: 75 },
  isVisible: { opacity: 1, x: 0 },
  isHidden: { opacity: 0, x: 75 },
};
const fetcher = (url) => fetch(url).then((r) => r.json());

const FilterSection = ({ categories, className }) => {
  return (
    <div className={`flex flex-col space-y-4 ${className ? className : ""}`}>
      <div className="flex flex-col">
        <TitreWidget>Categories</TitreWidget>
        <BlocCategoriesSelector categories={categories} />
        <TitreWidget>Prix</TitreWidget>
        <BlocPriceRange min={15} max={1000} />
      </div>
      <div>A venir</div>
    </div>
  );
};
const BlocCategoriesSelector = ({ categories }) => {
  const router = useRouter();
  const [categoriesList, setCategoriesList] = useState(
    categories.filter((item) =>
      router?.query?.category?.length
        ? item.slug !==
          router?.query?.category[router?.query?.category?.length - 1]
        : true
    )
  );
  const activeCat = router?.query?.categoryIn;
  const activeCatId = activeCat
    ? categories.find((el) => el.slug === activeCat)?.databaseId
    : router?.query?.category?.length
    ? categories.find((el) => el.slug === router?.query?.category[0])
        ?.databaseId
    : null;
  const { data, error } = useSWR(
    activeCatId ? `/api/categorie/?parent=${activeCatId}` : null,
    fetcher
  );
  useEffect(() => {
    if (!router?.query?.categoryIn && !router?.query?.category) {
      setCategoriesList(categories);
      return null;
    }
    if (
      (router?.query?.categoryIn || router?.query?.category) &&
      data?.productCategories?.nodes &&
      data?.productCategories?.nodes.length > 2
    ) {
      setCategoriesList(
        data?.productCategories?.nodes.filter((item) =>
          router?.query?.category?.length
            ? item.slug !==
              router?.query?.category[router?.query?.category?.length - 1]
            : true
        )
      );
    } else {
      !router?.query?.categoryIn && setCategoriesList(categories);
    }
  }, [
    router?.query?.categoryIn,
    router?.query?.asPath,
    data?.productCategories?.nodes,
  ]);
  console.log(categoriesList);
  return (
    <AnimatePresence exitBeforeEnter>
      {true && (
        <Link href={"/galerie-photo"} passHref>
          <motion.a
            key={`fieler-item-retour-nav`}
            //  onClick={() => updateQuery(false, "categoryIn", router)}
            className="p-1"
            initial="initial"
            animate="isVisible"
            exit="isHidden"
            variants={animationParent}
          >
            retour
          </motion.a>
        </Link>
      )}
      {categoriesList &&
        categoriesList.map((item) => (
          <Link
            href={item.uri || "../"}
            passHref
            key={`fieler-item-${item.name}`}
          >
            <motion.a
              // onClick={() => updateQuery(item.slug, "categoryIn", router)}
              className="p-1"
              initial="initial"
              animate="isVisible"
              exit="isHidden"
              variants={animationParent}
            >
              <span className={`relative inline-block`}>
                <AnimatePresence exitBeforeEnter>
                  {activeCat?.includes(item.slug) && (
                    <motion.span
                      initial={{ x: 55, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 25, opacity: 0 }}
                      className={`bg-gray-300 absolute inset-1 rounded-full`}
                    ></motion.span>
                  )}
                </AnimatePresence>
                <motion.span
                  variants={animationChild}
                  className="relative inline-block"
                >
                  {item.name}
                </motion.span>
              </span>
            </motion.a>
          </Link>
        ))}
    </AnimatePresence>
  );
};
const BlocPriceRange = ({ min, max }) => {
  const router = useRouter();
  const [values, setValues] = useState({ min: 80, max: 500 });
  const [isActive, setIsActive] = useState(false);

  const rangeHandler = (value) => {
    setValues(value);
    value.min && updateQuery(value.min, "min", router);
    value.max && updateQuery(value.max, "max", router);
    if (!value.max && !value.min && value) {
      updateQuery(value, "max", router);
      updateQuery(false, "min", router);
    }
  };
  return (
    <div className={`p-4`}>
      <div className={`flex flex-row pb-6`}>
        <div className="flex items-center justify-between space-x-1">
          <div
            className={`flex items-center w-8 h-5 p-1 duration-300 ease-in-out bg-gray-300 rounded-full ${
              values.min ? "bg-green-400" : ""
            }`}
            onClick={() => setValues(values?.min ? 200 : { min: 80, max: 500 })}
          >
            <div
              className={`w-4 h-4 duration-300 ease-in-out transform bg-white rounded-full shadow-md ${
                values.min ? "translate-x-2" : ""
              }`}
            ></div>
          </div>
          <h2>{values?.min ? "prix max" : "fourchette"}</h2>
          <div onClick={() => updateQuery(null, "disablePrice", router)}>
            reset
          </div>
        </div>
      </div>
      <InputRange
        step={5}
        maxValue={max}
        minValue={min}
        formatLabel={(value) => `${value}€`}
        value={values}
        onChange={(value) => {
          setValues(value);
        }}
        onChangeComplete={(value) => rangeHandler(value)}
      />
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
    // delete theQuery["slug"];
    const formattedQuery = new URLSearchParams(theQueryAction).toString();
    router.push(
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
