import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { TitreWidget } from "../themeComponents";

const animationParent = {
  initial: { scaleY: 0.1, height: 0 },
  isVisible: {
    scaleY: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.1,
    },
  },
  isHidden: { scaleY: 0.1, height: 0 },
};
const animationChild = {
  initial: { opacity: 0, x: 75 },
  isVisible: { opacity: 1, x: 0 },
  isHidden: { opacity: 0, x: 75 },
};
const CategorieList = ({ navCatData, className }) => {
  const [check, setCheck] = useState(true);
  // ...
  const { t } = useTranslation("shop");

  return (
    <div
      className={`flex bg-white float-right flex-col lg:h-auto lg:min-h-0 min-h-screen space-y-4 ${
        className ? className : ""
      }`}
    >
      <TitreWidget onClick={() => setCheck((prevCheck) => !prevCheck)}>
        {t("categories")}
      </TitreWidget>
      <AnimatePresence exitBeforeEnter>
        {check && (
          <motion.div
            initial="initial"
            animate="isVisible"
            exit="isHidden"
            variants={animationParent}
            className={`flex flex-col relative`}
          >
            {navCatData?.length && <SideNavRoot navCatData={navCatData} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SideNavRoot = ({ navCatData }) => {
  return navCatData.map((item, i) => (
    <motion.div variants={animationChild} key={`side-nav-item-${i}`}>
      <NavRootItem {...item}></NavRootItem>
    </motion.div>
  ));
};

const NavRootItem = ({ name, slug, id, children }) => {
  return (
    <Link href={`/categorie/${slug.replace("?lang=en", "")}`} key={id} passHref>
      <a
        className={`p-1 block leading-4  transform hover:scale-110 transition-transform`}
      >
        {name}
      </a>
    </Link>
  );
};

export default CategorieList;
