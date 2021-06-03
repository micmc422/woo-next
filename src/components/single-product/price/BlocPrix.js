import { AnimatePresence, motion } from "framer-motion";

const BlocPrix = ({ price, activeVariations }) => {
  return (
    <AnimatePresence>
      {activeVariations ? (
        <motion.div className="font-medium title-font">
          {activeVariations?.price}
        </motion.div>
      ) : (
        <motion.div className="font-medium title-font">{price}</motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlocPrix;
