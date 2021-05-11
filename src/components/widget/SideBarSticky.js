import { useState } from "react";
/*
 ${
          isOpen ? "z-40" : "hidden"
        }
        */
const SideBarSticky = ({ children, isRight }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={`flex-grow lg:hidden block w-0 z-50 ${
          !isOpen ? "bg-red-400" : "hidden"
        }`}
      >
        <div
          className={`sticky  top-10 bg-black rounded-full w-16 h-16 ${
            isRight ? "float-right" : "float-left"
          }`}
          onClick={() => setIsOpen(true)}
        >
          open
        </div>
      </div>
      <div className={`flex-grow lg:block w-0 lg:w-auto relative`}>
        <div
          className={`sticky top-0 block ring-2 ring-white transform transition-transform z-40 ${
            isRight ? "float-right" : "float-left"
          } ${
            isRight
              ? isOpen
                ? "translate-y-0"
                : "translate-y-screen"
              : isOpen
              ? "translate-x-0"
              : " -translate-x-full"
          }`}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SideBarSticky;
