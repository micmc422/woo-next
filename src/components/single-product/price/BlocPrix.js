import { AnimatePresence, motion } from "framer-motion";

const BlocPrix = ({ price, activeVariations }) => {
  return (
    <AnimatePresence>
      {activeVariations ? (
        <motion.div className="text-gray-700 title-font font-bold">
          {activeVariations?.price}
        </motion.div>
      ) : (
        <motion.div className="font-bold text-gray-700 title-font">
          {price}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlocPrix;
