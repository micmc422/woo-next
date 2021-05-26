import { motion } from "framer-motion";

const animationParent = {
  initial: {},
  animate: {},
  hovered: {},
  exit: {},
};
const animationBg = {
  initial: (custom) => ({ y: custom ? 10 : -50 }),
  animate: { y: 0, x: 0, borderRadius: "50%" },
  hovered: (custom) => ({
    scale: !custom ? [1, 1.5, 1.5, 0.5, 1] : 1,
    rotate: !custom ? [0, 0, 270, 270, 0] : 0,
    borderRadius: !custom ? ["50%", "20%", "50%", "20%", "50%"] : "50%",
    transition: { repeat: Infinity, duration: 2 },
  }),
  exit: {},
};
const animationText = {
  initial: { x: -10 },
  animate: { x: 0, x: 0 },
  hovered: { x: 12.5 },
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
      className="relative block"
    >
      <motion.div
        variants={animationBg}
        custom={small}
        className={`absolute  transition-colors rounded-full
        ${circleClass ? circleClass : "bg-gray-200 shadow-lg"} 
        ${small ? "w-8 h-8" : "h-12 w-12"} 
        `}
      >
        {icon && <div className="relative">{icon}</div>}
      </motion.div>

      <motion.div variants={animationText} className="relative inset-0 p-1 ">
        {children}
      </motion.div>
    </motion.div>
  );
};

export const PriceParse = ({ price }) => {
  const temp = price.split("-");
  const parsedPrice = temp[0].trim();

  return (
    <>
      {temp.length > 1 ? (
        <p className={`text-xs leading-3`}>
          <span className="text-purple-500 safe">à partir de</span> <br />
          {parsedPrice}
        </p>
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
