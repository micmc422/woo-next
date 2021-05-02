import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ParentCategoryBlock = (props) => {
  const { category, i } = props;
  // console.log(category.product?.nodes);
  const imgListUrl = {
    imgSourceUrlList: [
      category?.image?.sourceUrl
        ? category.image.sourceUrl
        : category.products?.nodes
        ? category.products.nodes[0].image.sourceUrl
        : "",
      ...category.products.nodes
        .slice(1, 4)
        .map(({ image }) => image.sourceUrl),
    ],
    imgSourceSrcSetList: [
      category?.image?.srcSet
        ? category.image.srcSet
        : category.products?.nodes
        ? category.products.nodes[0].image.srcSet
        : "",
      ...category.products.nodes.slice(1, 4).map(({ image }) => image.srcSet),
    ],
  };
  // console.log(imgListUrl);
  return (
    <div className="mb-5 product">
      <Link href={`/category/${category.slug}`}>
        <a>
          <ImageCaroussel {...imgListUrl} i={i} />
          <div className="p-3 product-title-container">
            <h3 className="text-lg font-medium product-title">
              {category.name}
            </h3>
            <span className="text-sm shop-now">+ Explore</span>
          </div>
        </a>
      </Link>

      {/*<div className="text-center card-body">*/}
      {/*	<h6 className="mb-3 card-subtitle">Hello</h6>*/}
      {/*</div>*/}
    </div>
  );
};
const autoPlay = true;

const ImageCaroussel = ({ imgSourceUrlList, imgSourceSrcSetList, i }) => {
  const autoPlay = true;
  const slideDuration = 3 + i / 3; // in seconds
  const activeIndexRef = useRef({ activeIndex: 0 });
  const slideRef = useRef(0);
  const [slide, setSlide] = useState(0);
  const [restartSlide, setRestartSlide] = useState(0);
  const { activeIndex } = activeIndexRef.current;
  /**
   * Change to next slide.
   */
  const nextSlide = () => {
    if (1 === imgSourceUrlList.length) {
      return null;
    }

    /**
     * If if autoplay is set to true
     * and all slides are finished playing,
     * set the activeIndex to one and restart the slide from start.
     */
    if (activeIndexRef.current.activeIndex === imgSourceUrlList.length - 1) {
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

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => nextSlide(), slideDuration * 1000);
      return () => clearInterval(interval);
    }
  }, []);
  return (
    <div
      className="relative h-40 overflow-hidden md:h-64"
      srcSet={imgSourceSrcSetList[activeIndex]}
      alt="ParentCategoryBlock image"
    >
      <AnimatePresence>
        <motion.div
          key={`img-cat-slide${activeIndex}`}
          initial={{ x: "-50%", opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.6 } }}
          exit={{ x: "50%", opacity: 0, transition: { duration: 0.6 } }}
          className="absolute inset-0 "
        >
          <Image
            src={imgSourceUrlList[activeIndex]}
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default ParentCategoryBlock;
