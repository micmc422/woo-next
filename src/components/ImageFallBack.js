import React, { useEffect, useState } from "react";
import Image from "next/image";
import clientConfig from "../../client-config";
import { useAnimation, motion } from "framer-motion";

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
        layout="fill"
        onLoad={() => setLoaded(true)}
      />
    </motion.div>
  );
};

export default ImageWithFallback;
