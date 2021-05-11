import { AnimatePresence, motion } from "framer-motion";
import { uniqueId } from "lodash";
import { useState } from "react";
const animateMenu = {
  initial: (isRight) => ({ x: isRight ? "100%" : "-100%" }),
  animate: { x: 0 },
  exit: (isRight) => ({ x: isRight ? "100%" : "-100%" }),
};
/*
 ${
          isOpen ? "z-40" : "hidden"
        }
        */
const SideBarSticky = ({ children, isRight }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={`flex-grow lg:hidden block w-0 z-50`}>
        <div
          className={`sticky  top-10 bg-black rounded-full w-16 h-16 ${
            isRight ? "float-right" : "float-left"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          open
        </div>
      </div>
      <div className={`hidden lg:block flex-grow w-0 lg:w-auto relative`}>
        <div
          className={`sticky top-0 block ring-2 ring-white z-40 ${
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
            key={uniqueId()}
            className={`lg:hidden block flex-grow w-0 lg:w-auto`}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div
              className={`sticky top-0 block ring-2 ring-white z-40 overflow-hidden ${
                isRight ? "float-right right-0" : "float-left"
              }`}
            >
              <motion.div
                variants={animateMenu}
                custom={isRight}
                onClick={() => setIsOpen(false)}
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
