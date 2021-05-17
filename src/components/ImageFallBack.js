import React, { useState } from "react";
import Image from "next/image";
import clientConfig from "../../client-config";
import { motion } from "framer-motion";

const ImageWithFallback = (props) => {
  const {
    src,
    slug,
    objectfit,
    fallbackSrc = clientConfig.productImagePlaceholder,
    ...rest
  } = props;
  const [imgSrc, setImgSrc] = useState(src);
  return <Image objectFit={objectfit} src={imgSrc} layout="fill" />;
};

export default ImageWithFallback;
