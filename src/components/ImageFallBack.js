import React, { useState } from "react";
import Image from "next/image";
import clientConfig from "../../client-config";
import { motion } from "framer-motion";

const ImageWithFallback = (props) => {
  const {
    src,
    slug,
    fallbackSrc = clientConfig.productImagePlaceholder,
    ...rest
  } = props;
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <motion.div layoutId={`image-principale-${slug}`}>
      {" "}
      <Image
        {...rest}
        src={imgSrc}
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
      />
    </motion.div>
  );
};

export default ImageWithFallback;
