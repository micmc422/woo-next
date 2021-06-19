import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const animationParent = {
  initial: {},
  animate: {},
  hovered: {},
  exit: {},
};
const animationBg = {
  initial: (custom) => ({ y: custom ? 10 : -50 }),
  animate: { y: 0, x: "0%", borderRadius: "50%" },
  hovered: (custom) => ({
    x: custom ? [3, 0, 3] : ["0%", "50%", "100%", "0%"],
    borderRadius: !custom ? ["50%", "20%", "20%", "50%"] : "50%",
    rotate: [0, 90, -90, 0],
    transition: { repeat: Infinity, duration: 2 },
  }),
  exit: {},
};
const animationText = {
  initial: { x: 0 },
  animate: { x: 5 },
  hovered: {
    y: -4,
  },
  exit: {},
};
export const BgPattern = ({ color = "D1D5DB" }) => {
  return (
    <div
      className="absolute inset-0 z-0 transition-all opacity-50 animate-rtl-linear-infinite"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${color}' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  );
};

export const Bouton = ({
  children = "",
  action,
  circleClass,
  icon,
  small = false,
  className,
}) => {
  return (
    <motion.div
      whileHover="hovered"
      variants={animationParent}
      className={`relative justify-center flex flex-col ${
        className ? className : " "
      }`}
      onClick={action}
    >
      <motion.div
        variants={animationBg}
        custom={small}
        className={`absolute  transition-colors rounded-full opacity-50
        ${circleClass ? circleClass : "neuromorphism-gray"} 
        ${small ? "w-8 h-8" : "h-12 w-12"} 
        `}
      ></motion.div>
      {icon && <div className="absolute top-0 left-1/2">{icon}</div>}

      <motion.div
        variants={animationText}
        className="relative inset-0 flex flex-row items-center p-1"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const PriceParse = ({ price }) => {
  const temp = price.split("-");
  const parsedPrice = temp[0].trim();
  const { t } = useTranslation("shop");

  return (
    <>
      {temp.length > 1 ? (
        <div>
          <div className="text-xs font-bold leading-3 text-purple-500 safe">
            {t("a-partir-de")}
          </div>{" "}
          <div className={`text-xs`}>{parsedPrice}</div>
        </div>
      ) : (
        parsedPrice
      )}
    </>
  );
};

export const ThemeH1 = ({ children }) => {
  return (
    <motion.h1
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="mb-5 text-4xl font-black uppercase lg:text-8xl md:text-6xl sm:text-4xl"
    >
      {children}
    </motion.h1>
  );
};
export const ThemePName = ({ children }) => {
  return (
    <div className={`relative`}>
      <div className="p-4 my-4">
        <h1 className="text-2xl font-black uppercase lg:text-6xl md:text-4xl">
          {children}
          <div className="absolute w-2 h-full rounded -top-0 -left-2 bg-brand-500" />
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            exit={{ width: "100%" }}
            transition={{
              duration: 2,
            }}
            className="absolute top-0 right-0 z-10 h-full bg-white"
          ></motion.div>
          <motion.div
            initial={{ right: "100%" }}
            animate={{ right: "0%" }}
            exit={{ right: "100%" }}
            className="absolute top-0 right-0 z-20 w-2 h-full bg-gray-300 rounded"
            transition={{
              duration: 2,
            }}
          />
        </h1>
      </div>
    </div>
  );
};
export const ThemeH2 = ({ children, alignRigth }) => {
  return (
    <motion.h2
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className={`p-4 relative mb-5 text-3xl font-black uppercase lg:text-6xl md:text-5xl sm:text-4xl`}
    >
      {children}
      <div className="absolute top-0 w-2 h-16 rounded -left-2 bg-brand-500" />
    </motion.h2>
  );
};
export const ThemeH3 = ({ children }) => {
  return (
    <motion.h3
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className={`p-4 mb-5 text-2xl font-black uppercase lg:text-5xl md:text-4xl sm:text-3xl text-gray-600`}
    >
      <div className="relative inline min-w-min">
        {children}
        <div className="absolute top-0 w-1 rounded shadow h-1/2 -left-3 bg-brand-500" />
        <div className="absolute w-1/2 h-1 bg-gray-300 rounded shadow -bottom-2 right-3" />
      </div>
    </motion.h3>
  );
};
export const ThemeH4 = ({ children }) => {
  return (
    <motion.h3
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className={`p-4 mb-5 text-xl font-black uppercase lg:text-4xl md:text-3xl sm:text-2xl text-gray-600 `}
    >
      <div className="relative inline-flex min-w-min">
        {children}
        <div className="absolute top-0 w-1 rounded shadow h-1/2 -left-3 bg-brand-500" />
        <div className="absolute bottom-0 w-1/2 h-1 bg-gray-300 rounded shadow right-3" />
      </div>
    </motion.h3>
  );
};
export const TitreDefault = () => {
  return <div></div>;
};
export const TitreWidget = (props) => {
  return (
    <div {...props} className="p-1 text-xl text-gray-700 uppercase">
      {props.children}
    </div>
  );
};
export const ChevronToBot = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};
