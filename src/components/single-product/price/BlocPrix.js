import { AnimatePresence, motion } from "framer-motion";

const BlocPrix = ({ price, activeVariations }) => {
  return (
    <AnimatePresence>
      {activeVariations ? (
        <motion.div className="text-2xl font-medium text-gray-900 title-font">
          {activeVariations?.price}
        </motion.div>
      ) : (
        <motion.div className="text-2xl font-medium text-gray-900 title-font">
          {price}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlocPrix;
