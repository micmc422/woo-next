import { motion } from "framer-motion";
import { uniqueId } from "lodash";
import Avatar from "react-avatar";

const parentAnimation = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
  exit: {},
};
const childAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const Reviews = ({ reviews }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={parentAnimation}
      className={`container mx-auto w-full p-4 md:w-1/2`}
    >
      {reviews.map((review) => (
        <Review review={review} key={uniqueId()} />
      ))}
    </motion.div>
  );
};

const Review = ({ review }) => {
  console.log(review);
  return (
    <motion.div variants={childAnimation} className="w-full p-4">
      <div className="h-full p-8 bg-gray-100 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="block w-5 h-5 mb-4 text-gray-400"
          viewBox="0 0 975.036 975.036"
        >
          <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
        </svg>
        <div
          className="mb-6 font-serif text-xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: review.content }}
        />
        <a className="inline-flex items-center">
          <Avatar name={review?.author?.node?.name} size={32} round={true} />
          <span className="flex flex-col flex-grow pl-4">
            <span className="text-lg font-medium text-gray-900">
              {review?.author?.node?.name}
            </span>
          </span>
        </a>
      </div>
    </motion.div>
  );
};

export default Reviews;
