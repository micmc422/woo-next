import Link from "next/link";
import Image from "../../../image";
import { DEFAULT_CATEGORY_IMG_URL } from "../../../constants/urls";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { Bouton } from "../../themeComponents";

const ParentCategoryBlock = (props) => {
  const { category, i } = props;
  const [slide, setSlide] = useState(0);

  const { t } = useTranslation("shop");
  const [autoPlay, setAutoPlay] = useState(true);
  const [xTransition, setXT] = useState(0);
  //  const [restartSlide, setRestartSlide] = useState(0);
  const slideDuration = 6; // in seconds
  const slideRef = useRef(0);
  const activeIndexRef = useRef({ activeIndex: 0 });

  let images = [];
  if (category.products.nodes) {
    category.products.nodes.map((product) => {
      product?.galleryImages?.nodes[0]?.sourceUrl &&
        images.push(product?.galleryImages?.nodes[0]?.sourceUrl);
      product?.galleryImages?.nodes[0]?.mediaItemUrl &&
        images.push(product?.galleryImages?.nodes[0]?.mediaItemUrl);
    });
  }
  if (category?.image) {
    images.push(category?.image?.sourceUrl);
  }
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const nextSlide = () => {
    if (1 === images.length) {
      return null;
    }

    /**
     * If if autoplay is set to true
     * and all slides are finished playing,
     * set the activeIndex to one and restart the slide from start.
     */
    if (activeIndexRef.current.activeIndex === images.length - 1) {
      activeIndexRef.current.activeIndex = 0;
      // setRestartSlide(0);
    } else {
      // If its not the last slide increment active index by one.
      activeIndexRef.current.activeIndex =
        activeIndexRef.current.activeIndex + 1;
    }

    slideRef.current = activeIndexRef.current.activeIndex;
    setSlide(slideRef.current);
  };

  const prevSlide = () => {
    if (1 === images.length) {
      return null;
    }
    /**
     * If if autoplay is set to true
     * and all slides are finished playing,
     * set the activeIndex to one and restart the slide from start.
     */
    if (activeIndexRef.current.activeIndex === 0) {
      activeIndexRef.current.activeIndex = images.length - 1;
      // setRestartSlide(images.length - 1);
    } else {
      // If its not the last slide increment active index by one.
      activeIndexRef.current.activeIndex =
        activeIndexRef.current.activeIndex - 1;
    }

    slideRef.current = activeIndexRef.current.activeIndex;
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

  const handleDrag = (event, info) => {
    setXT(info.offset.x);
    if (info.offset.x === 0) return;
    if (info.offset.x > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  return (
    <div
      className="relative mb-5 overflow-hidden product "
      ref={ref}
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <Link href={`/categorie/${category?.slug}`}>
        <a>
          <div className="relative block w-full h-64 overflow-hidden md:h-96">
            <AnimatePresence>
              <motion.div
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                onDragEnd={(event, info) => handleDrag(event, info)}
                className="absolute inset-0"
                key={`image-${category.slug}-${slide}`}
                initial={{ opacity: 0, scale: 0.5, x: -xTransition }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, x: xTransition }}
              >
                <Image
                  className="object-cover h-64 pointer-events-none md:h-96"
                  layout="fill"
                  containerClassNames="w-full h-64 md:h-96 max-w-full"
                  sourceUrl={images[slide] ?? ""}
                  defaultImgUrl={DEFAULT_CATEGORY_IMG_URL}
                  altText={category?.image?.altText ?? category.slug}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="p-3 product-title-container">
            <h3 className="text-lg font-medium product-title">
              {category?.name}
            </h3>
            <Bouton>
              <span className="text-sm shop-now">{t("explorer")}</span>
            </Bouton>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ParentCategoryBlock;
