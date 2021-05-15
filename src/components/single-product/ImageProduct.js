import { AnimateSharedLayout, motion } from "framer-motion";
import { uniqueId } from "lodash";
import Image from "next/image";
import { useState } from "react";

const ImageProduct = ({
  slug,
  sourceUrl,
  mediaItemUrl,
  mediaDetails: { height, width },
}) => {
  return (
    <motion.div
      layoutId={`image-principale-${slug}`}
      className="relative max-h-screen"
    >
      <Image
        className="object-cover object-center w-full rounded lg:w-4/5 lg:h-auto"
        src={sourceUrl ? sourceUrl : mediaItemUrl}
        alt="Product Image"
        height={height}
        width={width}
      />
    </motion.div>
  );
};
const ImageContainer = ({ imgarray }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="w-full lg:w-1/2">
      <motion.div layout className="relative max-h-screen">
        {imgarray.map(
          (item, i) => selected === i && <ImageProduct {...item} key={i} />
        )}
      </motion.div>
      <Vignettes imgarray={imgarray} setSelected={setSelected} />
    </div>
  );
};

const Vignettes = ({ imgarray, setSelected }) => {
  // console.log(imgarray);
  return (
    <div className={`h-24 relative flex flex-row w-2/3 mx-auto space-x-2`}>
      {imgarray.map(
        (
          { id, sourceUrl, mediaItemUrl, mediaDetails: { height, width } },
          i
        ) => {
          return (
            <div
              className={` w-24 h-24 relative ring-2 ring-brand-500 ring-opacity-60 rounded-md`}
              onClick={() => setSelected(i)}
              key={uniqueId()}
            >
              <Image
                className="object-cover object-center rounded "
                src={sourceUrl ? sourceUrl : mediaItemUrl}
                alt="Product Image"
                layout="fill"
              />
            </div>
          );
        }
      )}
    </div>
  );
};
export default ImageContainer;
