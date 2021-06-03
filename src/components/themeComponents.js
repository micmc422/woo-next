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
    scale: [1, 1.02, 1],
    transition: { repeat: Infinity },
  },
  exit: {},
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
        className={`absolute  transition-colors rounded-full
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
