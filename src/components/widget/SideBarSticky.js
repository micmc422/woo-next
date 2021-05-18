import { AnimatePresence, motion } from "framer-motion";
import { uniqueId } from "lodash";
import { useState } from "react";

const animateMenu = {
  initial: (isRight) => ({ x: isRight ? "100%" : "-100%" }),
  animate: { x: 0 },
  exit: (isRight) => ({ x: isRight ? "100%" : "-100%" }),
};

const SideBarSticky = ({ children, isRight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setHidden = (state) => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  return (
    <>
      <div
        className={`flex-grow lg:hidden  w-0 z-30 ${
          isRight ? "hidden" : "block"
        }`}
      >
        <AnimatePresence>
          <div
            className={`sticky top-0 overflow-hidden ${
              isRight ? "float-right right-0" : "float-left"
            }`}
          >
            {!isOpen && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animateMenu}
                custom={isRight}
                className={`bg-white ring-2 ring-brand-500 shadow-md rounded-full w-12 h-12 m-1`}
                onClick={() => {
                  setHidden();
                  setIsOpen(!isOpen);
                }}
              >
                open
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
      <div className={`hidden lg:block flex-grow w-0 lg:w-auto relative`}>
        <div
          className={`sticky top-0 block z-30 ${
            isRight ? "float-right" : "float-left"
          }`}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setHidden(false);
              setIsOpen(false);
            }}
            className={`fixed inset-0 bg-white opacity-50 z-10`}
          ></motion.div>
        )}
        {isOpen && (
          <motion.div
            key={uniqueId()}
            className={`lg:hidden block flex-grow w-0 lg:w-auto`}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div
              className={`sticky top-0 block z-30 overflow-hidden ${
                isRight ? "float-right right-0" : "float-left"
              }`}
            >
              <motion.div
                variants={animateMenu}
                custom={isRight}
                onClick={() => {
                  setHidden(false);
                  setIsOpen(false);
                }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideBarSticky;
