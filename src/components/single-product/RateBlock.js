import { useMutation } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import { uniqueId } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import ADD_REVIEW from "../../mutations/add-review";
import { Bouton } from "../themeComponents";

const RateBlock = ({ rating, reviewCount, product }) => {
  const starBloc = [1, 2, 3, 4, 5];
  const [reviews, setReviews] = useState(false);
  console.log(reviews);
  return (
    <div className="flex mb-4">
      <AnimatePresence>
        {reviews && (
          <>
            <RateReviewsPopUp product={product} setReviews={setReviews} />
          </>
        )}
      </AnimatePresence>
      {rating > 1 ? (
        <>
          <span className="flex items-center" onClick={() => setReviews(true)}>
            {starBloc.map((count) =>
              count <= rating ? (
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              ) : (
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              )
            )}

            <span className="ml-3 text-gray-600">{reviewCount} Avis</span>
          </span>
        </>
      ) : (
        <span className="flex items-center" onClick={() => setReviews(true)}>
          <span className="ml-3 text-gray-600">Soyez le premier à voter !</span>
        </span>
      )}
      <span className="flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s">
        <a className="text-gray-500">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a className="text-gray-500">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a className="text-gray-500">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
          </svg>
        </a>
      </span>
    </div>
  );
};

const RateReviewsPopUp = ({ setReviews, product }) => {
  const starBloc = [1, 2, 3, 4, 5];
  const [isValid, setIsValid] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [addReviews, { data }] = useMutation(ADD_REVIEW);
  useEffect(() => {
    if (rating && authorName) {
      setIsValid(true);
    }
  }, [rating, content, authorName]);
  console.log(data);
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center w-full h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex items-center justify-center w-full h-screen bg-black"
        onClick={(e) => {
          setReviews(false);
        }}
      />

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 400, opacity: 0 }}
        className="z-50 flex flex-col items-stretch w-full mx-3 overflow-hidden bg-blue-600 bg-center bg-cover rounded shadow-md bg-image sm:w-1/2 md:w-9/12 lg:w-1/2 md:mx-5 lg:mx-0 md:flex-row"
      >
        <div className="relative flex flex-col w-full bg-blue-600 bg-opacity-25 md:w-1/2">
          <Image
            className="absolute inset-0 z-0"
            src={product?.image.sourceUrl}
            layout="fill"
            objectFit="none"
          />
        </div>
        <div className="flex flex-col items-center w-full px-4 py-5 bg-white md:w-1/2 md:py-8">
          <h3 className="flex items-center mb-4 text-3xl font-bold text-blue-500">
            Commentaire
          </h3>
          <span className="flex items-center pb-8">
            {starBloc.map((count) =>
              count <= rating ? (
                <svg
                  key={uniqueId(count)}
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                  onMouseEnter={() => setRating(count)}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              ) : (
                <svg
                  key={uniqueId(count)}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                  onMouseEnter={() => setRating(count)}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              )
            )}
          </span>
          <input
            type="name"
            placeholder="Votre nom"
            className="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm resize-y focus:outline-none focus:border-blue-500"
            onKeyUp={(e) => setAuthorName(e.target.value)}
          />

          <textarea
            type="review"
            placeholder="Votre commentaire"
            className="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm resize-y focus:outline-none focus:border-blue-500"
            onKeyUp={(e) => setContent(e.target.value)}
          />
          {error && <span className="p-2 text-red-500">{error}</span>}

          <Bouton
            className="py-4"
            action={() =>
              isValid
                ? addReviews({
                    variables: {
                      input: {
                        rating,
                        commentOn: product.productId,
                        content,
                        author: authorName,
                      },
                    },
                  }).catch((e) => setError(e.message))
                : null
            }
          >
            Valider
          </Bouton>
        </div>
      </motion.div>
    </div>
  );
};
export default RateBlock;
