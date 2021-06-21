import { AnimatePresence, motion } from "framer-motion";

const BlocPrix = ({ price, activeVariations }) => {
  return (
    <AnimatePresence>
      {activeVariations ? (
        <motion.div className="">
          {activeVariations?.price}
        </motion.div>
      ) : (
        <motion.div className="">{price}</motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlocPrix;
