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
