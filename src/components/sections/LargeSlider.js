import { isEmpty, isArray, uniqueId } from "lodash";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";
import { Bouton, PriceParse } from "../themeComponents";

const LargeSlider = ({ products }) => {
  if (isEmpty(products) || !isArray(products)) {
    return null;
  }
  const emptyArray = [...Array(products.length).keys()];
  const [autoPlay, setAutoPlay] = useState(true);
  const slideDuration = 6; // in seconds
  const activeIndexRef = useRef({ activeIndex: 0 });
  const slideRef = useRef(0);
  const [slide, setSlide] = useState(0);
  const [restartSlide, setRestartSlide] = useState(0);
  const { activeIndex } = activeIndexRef.current;
  /**
   * Change to next slide.
   */
  const nextSlide = () => {
    if (1 === products.length) {
      return null;
    }

    /**
     * If if autoplay is set to true
     * and all slides are finished playing,
     * set the activeIndex to one and restart the slide from start.
     */
    if (activeIndexRef.current.activeIndex === products.length - 1) {
      activeIndexRef.current.activeIndex = 0;
      setRestartSlide(restartSlide + 1);
    } else {
      // If its not the last slide increment active index by one.
      activeIndexRef.current.activeIndex =
        activeIndexRef.current.activeIndex + 1;
    }

    slideRef.current = (slideRef.current % products.length) + 1;
    setSlide(slideRef.current % products.length);
  };

  const prevSlide = () => {
    if (1 === products.length) {
      return null;
    }

    /**
     * If if autoplay is set to true
     * and all slides are finished playing,
     * set the activeIndex to one and restart the slide from start.
     */
    if (activeIndexRef.current.activeIndex === 0) {
      activeIndexRef.current.activeIndex = products.length - 1;
      setRestartSlide(restartSlide - 1);
    } else {
      // If its not the last slide increment active index by one.
      activeIndexRef.current.activeIndex =
        activeIndexRef.current.activeIndex - 1;
    }
    // console.log(activeIndexRef.current.activeIndex);
    slideRef.current = activeIndexRef.current.activeIndex;
    setSlide(slideRef.current % products.length);
  };
  const goToSlide = (i) => {
    /**
     * If if autoplay is set to true
     * and all slides are finished playing,
     * set the activeIndex to one and restart the slide from start.
     */
    activeIndexRef.current.activeIndex = i;
    slideRef.current = i;
    setSlide(slideRef.current);
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => nextSlide(), slideDuration * 1000);
      return () => clearInterval(interval);
    }
  }, [autoPlay]);
  const { image, id, name, title, slug, featuredImage, price } = products[
    activeIndex
  ];
  //console.log(products[activeIndex]);
  return (
    <div
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
      className="relative flex flex-col justify-between overflow-hidden banner sm:flex-row"
    >
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="relative z-10 px-10 pt-10 space-y-2 banner-content sm:pt-0 sm:w-4/12"
          key={`titre-slider-${slug}-${id}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ delayChildren: 0.5, when: "afterChildren" }}
        >
          <h2
            className="text-base text-gray-800 uppercase md:text-4xl"
            dangerouslySetInnerHTML={{
              __html: name || title,
            }}
          ></h2>
          <div className="text-base text-gray-500 md:text-2xl">
            <PriceParse price={price} />
          </div>
          <Link href={`/photo/${slug}/`}>
            <a className="font-semibold text-gray-800">
              <Bouton>Voir</Bouton>
            </a>
          </Link>
        </motion.div>
      </AnimatePresence>
      <div className="relative banner-img sm:w-8/12">
        <AnimatePresence>
          <motion.div
            key={`image-${slug}-${id}`}
            initial={{ opacity: 0, x: "100%" }}
            animate={{
              opacity: 1,
              x: "0%",
            }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
            className={`absolute top-0 left-0 z-0`}
          >
            <img
              src={image ? image?.sourceUrl : featuredImage.sourceUrl}
              srcSet={image ? image?.srcSet : featuredImage.srcSet}
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
        <div className="slider-button">
          <button className="focus:outline-none" onClick={prevSlide}>
            <svg
              width="25px"
              className="inline-block mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </button>
          <button className="focus:outline-none" onClick={nextSlide}>
            <svg
              width="25px"
              className="inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-20 px-4 sm:w-4/12">
        <AnimateSharedLayout type="crossfade">
          <motion.ul
            className="flex flex-row justify-center pb-2 space-x-2 align-middle"
            layout
          >
            {emptyArray.length &&
              emptyArray.map((item, i) => {
                console.log(slide);
                return (
                  <RoundedCounter
                    key={uniqueId()}
                    products={products}
                    slide={slide === i}
                    goToSlide={goToSlide}
                    i={i}
                  />
                );
              })}
          </motion.ul>
        </AnimateSharedLayout>
      </div>
    </div>
  );
};

function RoundedCounter({ slide, goToSlide, i }) {
  return (
    <div onClick={() => goToSlide(i)}>
      <div
        className={`relative transition-colors w-3 h-3 ${
          slide ? "bg-gray-200" : "bg-gray-300"
        }  pt-1 rounded-full hover:bg-brand-300`}
      >
        {slide && (
          <motion.div
            layoutId="inner-btn-slider"
            className={`absolute -inset-1 m-auto rounded-full ring-inset ring-2  ring-brand-400 hover:ring-brand-300`}
          ></motion.div>
        )}
      </div>
    </div>
  );
}

export default LargeSlider;
