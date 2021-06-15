import { isEmpty, isArray } from "lodash";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Bouton } from "../../themeComponents";
import { useTranslation } from "react-i18next";

const HeroCarousel = ({ heroCarousel }) => {
  if (isEmpty(heroCarousel) || !isArray(heroCarousel)) {
    return null;
  }

  const [autoPlay, setAutoPlay] = useState(true);
  const [xTransition, setXT] = useState(0);
  const slideDuration = 6; // in seconds
  const activeIndexRef = useRef({ activeIndex: 0 });
  const slideRef = useRef(0);
  const [slide, setSlide] = useState(0);
  const [restartSlide, setRestartSlide] = useState(0);
  const { activeIndex } = activeIndexRef.current;
  const { t } = useTranslation("shop");

  /**
   * Change to next slide.
   */
  const nextSlide = (dragX = 0) => {
    if (1 === heroCarousel.length) {
      return null;
    }
    setXT(dragX);

    /**
     * If if autoplay is set to true
     * and all slides are finished playing,
     * set the activeIndex to one and restart the slide from start.
     */
    if (activeIndexRef.current.activeIndex === heroCarousel.length - 1) {
      activeIndexRef.current.activeIndex = 0;
      setRestartSlide(restartSlide + 1);
    } else {
      // If its not the last slide increment active index by one.
      activeIndexRef.current.activeIndex =
        activeIndexRef.current.activeIndex + 1;
    }

    slideRef.current = slideRef.current + 1;
    setSlide(slideRef.current);
  };

  const prevSlide = (dragX = 0) => {
    if (1 === heroCarousel.length) {
      return null;
    }
    setXT(dragX);

    /**
     * If if autoplay is set to true
     * and all slides are finished playing,
     * set the activeIndex to one and restart the slide from start.
     */
    if (activeIndexRef.current.activeIndex === 0) {
      activeIndexRef.current.activeIndex = heroCarousel.length - 1;
      setRestartSlide(heroCarousel.length - 1);
    } else {
      // If its not the last slide increment active index by one.
      activeIndexRef.current.activeIndex =
        activeIndexRef.current.activeIndex - 1;
    }

    slideRef.current = slideRef.current - 1;
    setSlide(slideRef.current);
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => nextSlide(), slideDuration * 1000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => null, slideDuration * 1000);
      return () => interval && clearInterval(interval);
    }
  }, [autoPlay]);

  const { image, id, name, title, slug, featuredImage } = heroCarousel[
    activeIndex
  ];

  const handleDrag = (event, info) => {
    if (info.offset.x === 0) return;
    if (info.offset.x > 0) {
      nextSlide(info.offset.x);
    } else {
      prevSlide(info.offset.x);
    }
  };
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden banner sm:flex-row"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div className="relative mb-8 overflow-hidden banner-img sm:w-8/12">
        <AnimatePresence>
          <motion.div
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            onDragEnd={(event, info) => handleDrag(event, info)}
            key={`image-${slug}-${id}`}
            initial={{ opacity: 0, scale: 1.1, x: -xTransition }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            exit={{ opacity: 0, filter: "blur(15px)", x: xTransition }}
            className={`absolute inset-0`}
          >
            <Image
              src={image ? image?.sourceUrl : featuredImage.node.sourceUrl}
              srcSet={image ? image?.srcSet : featuredImage.node.srcSet}
              layout="fill"
              objectfill="cover"
              className="pointer-events-none"
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
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="absolute px-4 py-5 m-4 bg-white rounded shadow-md md:relative md:bg-transparent md:px-10 banner-content sm:pt-0 sm:w-4/12 md:shadow-none md:rounded-none"
          key={`titre-slider-${slug}-${id}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 200 }}
        >
          <h2
            className="text-base uppercase md:text-4xl"
            dangerouslySetInnerHTML={{
              __html: name || title,
            }}
          ></h2>
          <Link href={`/categorie/${slug}/`}>
            <Bouton small={true}>
              <a className="">{t("explorer")}</a>
            </Bouton>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;
