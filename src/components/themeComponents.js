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

export const Bouton = ({ children = "button text", action }) => {
  return (
    <motion.div
      whileHover="hovered"
      variants={animationParent}
      className="relative block h-12"
    >
      <motion.div
        variants={animationBg}
        className="absolute w-12 h-12 transition-colors rounded-full bg-brand-500"
      ></motion.div>
      <div className="relative pt-1">{children}</div>
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
