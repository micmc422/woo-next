import { AnimatePresence, motion } from "framer-motion";
import { uniqueId } from "lodash";
import { useState } from "react";

const animateMenu = {
  initial: (isRight) => ({ x: isRight ? "100%" : "-100%" }),
  animate: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.2,
      staggerChildren: 0.1,
    },
    when: "beforeChildren",
  },
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
              isRight ? "float-right -right-8" : "float-left"
            }`}
          >
            {!isOpen && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animateMenu}
                custom={isRight}
                className={`bg-white shadow-xl rounded-full w-8 h-8 m-1 flex items-center justify-center`}
                onClick={() => {
                  setHidden();
                  setIsOpen(!isOpen);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
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
