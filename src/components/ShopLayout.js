import { isArray } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Bouton } from "./themeComponents";
import CategorieList from "./widget/CategorieList";
import FilterSection from "./widget/FilterSection";
import SideBarSticky from "./widget/SideBarSticky";
import TagList from "./widget/TagList";

const ShopLayout = ({
  children,
  categories,
  catBase,
  tagList,
  pageInfo,
  className,
}) => {
  const [pageLength, setPageLength] = useState(24);
  const toShop = useRef(null);
  const executeScroll = () => toShop.current.scrollIntoView();
  return (
    <div className={`flex flex-row lg:space-x-2 ${className ? className : ""}`}>
      <SideBarSticky>
        <FilterSection className="w-48 m-auto" categories={categories} />
      </SideBarSticky>
      <div
        className="container max-w-screen-lg mx-auto"
        id="top-shop"
        ref={toShop}
      >
        {children}
        <Pagination
          pageInfo={pageInfo}
          pageLength={pageLength}
          executeScroll={executeScroll}
        />
      </div>
      <SideBarSticky isRight={true}>
        <CategorieList
          className="w-48 m-auto text-right"
          navCatData={catBase}
        />
        <TagList className="w-48 m-auto text-right" tagList={tagList} />
      </SideBarSticky>
    </div>
  );
};
const Pagination = ({ pageInfo = {}, pageLength, executeScroll }) => {
  const { hasNextPage, hasPreviousPage } = pageInfo;
  const router = useRouter();
  return (
    <div className={`flex flex-row justify-around pt-8`}>
      {hasPreviousPage && (
        <Bouton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mt-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          <button
            className={`focus:outline-none`}
            onClick={() =>
              replaceQuery(
                pageInfo.startCursor,
                "before",
                router,
                pageLength,
                executeScroll
              )
            }
          >
            précédent
          </button>
        </Bouton>
      )}
      {hasNextPage && (
        <Bouton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mt-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          <button
            onClick={() =>
              replaceQuery(
                pageInfo.endCursor,
                "after",
                router,
                pageLength,
                executeScroll
              )
            }
            className={`focus:outline-none`}
          >
            suivant
          </button>
        </Bouton>
      )}
    </div>
  );
};
const replaceQuery = (name, key, router, pageLength, executeScroll) => {
  const { query } = router;
  executeScroll();
  let theQuery = query;
  delete theQuery["lang"];
  theQuery[key] = name;
  if (key === "after") {
    delete theQuery["first"];
    delete theQuery["before"];
    delete theQuery["last"];
  }
  if (key === "before") {
    theQuery["last"] = pageLength;
    delete theQuery["after"];
    delete theQuery["first"];
  }
  if (key === "category") {
  }
  console.log(theQuery["category"]);
  if (isArray(theQuery["category"])) {
    theQuery["category"] =
      theQuery["category"][theQuery["category"]?.length - 1];
  }
  console.log(theQuery["category"]);
  const options = { scroll: false };
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
export default ShopLayout;
