import { useRouter } from "next/router";
import { TitreWidget } from "../themeComponents";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";

import InputRange from "react-input-range";

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

const FilterSection = ({ categories }) => {
  // console.log(router);
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <TitreWidget>Categories</TitreWidget>

        <BlocCategoriesSelector categories={categories} />
        <TitreWidget>Prix</TitreWidget>
        <BlocPriceRange min={15} max={1000} />
      </div>
      <div>Prix</div>
      <div>A venir</div>
    </div>
  );
};
const BlocCategoriesSelector = ({ categories }) => {
  const router = useRouter();
  const [categoriesList, setCategoriesList] = useState(categories);
  const activeCat =
    router?.query?.category && router.query["category"].split(",")[0];
  const activeCatId = router?.query?.slug
    ? categories.find((el) => el.slug === router?.query?.slug)?.databaseId
    : categories.find((el) => el.name === activeCat)?.databaseId;
  const { data, error } = useSWR(
    activeCatId ? `/api/categorie/?parent=${activeCatId}` : null,
    fetcher
  );
  useEffect(() => {
    if (
      data?.productCategories?.nodes &&
      data?.productCategories?.nodes.length > 2
    ) {
      setCategoriesList(data?.productCategories?.nodes);
    } else {
      if (!activeCat) setCategoriesList(categories);
    }
  });
  return (
    <AnimatePresence exitBeforeEnter>
      {categoriesList &&
        categoriesList.map((item) => (
          <motion.a
            key={`fieler-item-${item.name}`}
            onClick={() => updateQuery(item.name, "category", router)}
            className="p-1"
            initial="initial"
            animate="isVisible"
            exit="isHidden"
            variants={animationParent}
          >
            <span className={`relative inline-block`}>
              <AnimatePresence exitBeforeEnter>
                {activeCat?.includes(item.name) && (
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
        ))}
    </AnimatePresence>
  );
};
const BlocPriceRange = ({ min, max }) => {
  const router = useRouter();
  const [values, setValues] = useState({ min: 80, max: 500 });

  const rangeHandler = (value) => {
    setValues(value);
    updateQuery(value.min, "min", router);
    updateQuery(value.max, "max", router);
  };
  return (
    <div className={`p-4`}>
      <InputRange
      step={5}
        maxValue={max}
        minValue={min}
        formatLabel={(value) => `${value}€`}
        value={values}
        onChange={(value) => {
          setValues(value);
        }}
        onChangeStart={(value) =>
          console.log("onChangeStart with value =", value)
        }
        onChangeComplete={(value) => rangeHandler(value)}
      />
    </div>
  );
  return (
    <>
      <style jsx>{`
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          input[type="range"]::-webkit-slider-thumb {
            width: 15px;
            -webkit-appearance: none;
            appearance: none;
            height: 15px;
            cursor: ew-resize;
            background: #fff;
            box-shadow: -405px 0 0 400px #605e5c;
            border-radius: 50%;
          }
        }
      `}</style>
      <input
        id="pricerange"
        class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
        type="range"
        min="1"
        max="100"
        step="1"
        value="15"
      />
    </>
  );
};
const updateQuery = (name, key, router) => {
  const { query } = router;

  const options = { scroll: false };
  let theQuery = query;
  delete theQuery["after"];
  delete theQuery["first"];
  delete theQuery["before"];
  delete theQuery["last"];

  if (theQuery[key]) {
    if (key !== "min" && key !== "max") {
      theQuery[key] = theQuery[key].split(",").filter((el) => el && el !== "");
      if (theQuery[key]?.find((n) => n === name)) {
        theQuery[key] = theQuery[key].filter((el) => el !== name);
        theQuery[key].length < 1 && delete theQuery[key];
      } else {
        theQuery[key] = [name];
      }
    }
    // console.log(theQuery[key]);
  } else {
  }
  theQuery[key] = [name];
  const formattedQuery = new URLSearchParams(theQuery).toString();
  router.push(
    {
      pathname: router.asPath.split("?")[0],
      query: formattedQuery,
    },
    null,
    options
  );
};

export default FilterSection;
