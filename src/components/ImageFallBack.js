import React, { useState } from "react";
import Image from "next/image";
import clientConfig from "../../client-config";

const ImageWithFallback = (props) => {
  const {
    src,
    fallbackSrc = clientConfig.productImagePlaceholder,
    ...rest
  } = props;
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
