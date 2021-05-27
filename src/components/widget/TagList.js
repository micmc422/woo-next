import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bouton, TitreWidget } from "../themeComponents";

const animationParent = {
  initial: { scaleY: 0.1, height: 0 },
  isVisible: {
    scaleY: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.05,
    },
  },
  isHidden: { scaleY: 0.1, height: 0 },
};
const animationChild = {
  initial: { opacity: 0, x: 75 },
  isVisible: { opacity: 1, x: 0 },
  isHidden: { opacity: 0, x: 75 },
};
const TagList = ({ tagList, className }) => {
  const [hovered, setHovered] = useState(null);
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
        {t("Tags")}
      </TitreWidget>
      <AnimatePresence exitBeforeEnter>
        {check && (
          <motion.div
            initial="initial"
            animate="isVisible"
            exit="isHidden"
            variants={animationParent}
            className={`flex flex-row flex-wrap relative text-right justify-end `}
          >
            <AnimateSharedLayout>
              {tagList?.length && (
                <SideNavRoot
                  tagList={tagList}
                  hovered={hovered}
                  setHovered={setHovered}
                />
              )}
            </AnimateSharedLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SideNavRoot = ({ tagList, hovered, setHovered }) => {
  const [limit, setLimit] = useState(32);
  return (
    <>
      {tagList.slice(0, limit).map((item, i) => (
        <motion.div variants={animationChild} key={`side-nav-item-${i}`}>
          <NavRootItem
            hovered={hovered}
            setHovered={setHovered}
            {...item}
          ></NavRootItem>
        </motion.div>
      ))}
      {limit === 32 ? (
        <Bouton>
          <div onClick={() => setLimit(100)}>Voir plus +</div>
        </Bouton>
      ) : (
        <Bouton>
          <div onClick={() => setLimit(32)}>Voir moins</div>
        </Bouton>
      )}
    </>
  );
};

const NavRootItem = ({ name, slug, id, count, hovered, setHovered }) => {
  return (
    count > 0 && (
      <Link href={`/etiquette/${slug}`} key={id} passHref>
        <a
          onMouseEnter={() => setHovered(id)}
          className={`p-1 block leading-none text-xs relative`}
        >
          {hovered === id && (
            <motion.div
              layoutId="tag-over"
              className="absolute z-0 rounded-full neuromorphism-gray -inset-1"
            >
              <span className="text-purple-500">{count}</span>
            </motion.div>
          )}
          <span className="relative z-10">{name}</span>
        </a>
      </Link>
    )
  );
};

export default TagList;
