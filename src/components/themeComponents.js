import { motion } from "framer-motion";

const animationParent = {
  initial: {},
  animate: {},
  hovered: {},
  exit: {},
};
const animationBg = {
  initial: { y: -50, scale: 0 },
  animate: { y: 0, x: 0, scale: 1 },
  hovered: { x: "50%", scale: 1.2 },
  exit: {},
};

export const Bouton = ({
  children = "",
  action,
  circleClass,
  icon,
  small = false,
}) => {
  return (
    <motion.div
      whileHover="hovered"
      variants={animationParent}
      className="relative block h-12"
    >
      <motion.div
        variants={animationBg}
        className={`absolute  transition-colors rounded-full
        ${circleClass ? circleClass : "bg-brand-500"} 
        ${small ? "w-8 h-8" : "w-12 h-12"} 
        `}
      >
        {icon && <div className="relative">{icon}</div>}
      </motion.div>

      <div className="relative inset-0 p-1 ">{children}</div>
    </motion.div>
  );
};

export const PriceParse = ({ price }) => {
  const temp = price.split("-");
  const parsedPrice = temp[0].trim();

  return (
    <div>{temp.length > 1 ? "à partir de " + parsedPrice : parsedPrice}</div>
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
