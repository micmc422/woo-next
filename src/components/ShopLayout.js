import { isArray } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Bouton } from "./themeComponents";
import CategorieList from "./widget/CategorieList";
import FilterSection from "./widget/FilterSection";
import SideBarSticky from "./widget/SideBarSticky";
import TagList from "./widget/TagList";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
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
        <button
          className={`focus:outline-none flex pr-2 text-white bg-gray-800 rounded-full items-center font-thin`}
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
          <MdNavigateBefore /> précédent
        </button>
      )}
      {hasNextPage && (
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
          className={`focus:outline-none flex pl-2 text-white bg-gray-800 rounded-full items-center`}
        >
          suivant <MdNavigateNext />
        </button>
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
  if (isArray(theQuery["category"])) {
    theQuery["category"] =
      theQuery["category"][theQuery["category"]?.length - 1];
  }
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
