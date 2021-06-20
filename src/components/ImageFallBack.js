// import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clientConfig from "../../client-config";
// import { useAnimation, motion } from "framer-motion";
// import Skeleton from "react-loading-skeleton";

/*
const animationVariants = {
  loaded: { opacity: 1 },
  notLoaded: { opacity: 0 },
};
*/

const ImageWithFallback = (props) => {
  /*
  const [loaded, setLoaded] = useState(true);
  const animationControls = useAnimation();
  useEffect(() => {
    if (loaded) {
      animationControls.start("loaded");
    }
  }, [loaded]);
  const [imgSrc, setImgSrc] = useState(src);
*/
  const {
    src,
    slug,
    objectfit,
    alt,
    fallbackSrc = clientConfig.productImagePlaceholder,
    ...rest
  } = props;
  return (
    <div className="relative w-full h-full">
      <Image
        objectFit={objectfit}
        src={src}
        alt={alt || "paris est une photo"}
        layout="fill"
        placeholder="blur"
        blurDataURL={src}
        /*
        onLoad={(event) => {
          const target = event.target;

          // next/image use an 1x1 px git as placeholder. We only want the onLoad event on the actual image
          if (target.src.indexOf("data:image/gif;base64") < 0) {
            setLoaded(true);
          }
        }}
        */
      />
    </div>
  );
};

export default ImageWithFallback;
