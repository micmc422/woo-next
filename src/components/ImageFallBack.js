import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clientConfig from "../../client-config";
import { useAnimation, motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";

const animationVariants = {
  loaded: { opacity: 1 },
  notLoaded: { opacity: 0 },
};

const ImageWithFallback = (props) => {
  const [loaded, setLoaded] = useState(false);
  const animationControls = useAnimation();
  useEffect(() => {
    if (loaded) {
      animationControls.start("loaded");
    }
  }, [loaded]);

  const {
    src,
    slug,
    objectfit,
    alt,
    fallbackSrc = clientConfig.productImagePlaceholder,
    ...rest
  } = props;
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <motion.div
      className="relative w-full h-full"
      initial={"notLoaded"}
      animate={animationControls}
      variants={animationVariants}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      <Image
        objectFit={objectfit}
        src={imgSrc}
        alt={alt || "paris est une photo"}
        layout="fill"
        onLoad={(event) => {
          const target = event.target;

          // next/image use an 1x1 px git as placeholder. We only want the onLoad event on the actual image
          if (target.src.indexOf("data:image/gif;base64") < 0) {
            setLoaded(true);
          }
        }}
      />
    </motion.div>
  );
};

export default ImageWithFallback;
