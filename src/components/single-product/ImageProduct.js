import { uniqueId } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";

/*
const animationVariants = {
  loaded: { opacity: 1 },
  notLoaded: { opacity: 0 },
};
*/

const ImageProduct = ({
  slug,
  sourceUrl,
  mediaItemUrl,
  mediaDetails: { height, width },
}) => {
  /*
  const [loaded, setLoaded] = useState(true);
  const animationControls = useAnimation();
  useEffect(() => {
    if (loaded) {
      animationControls.start("loaded");
    }
  }, [loaded]);
*/
  return (
    <div
      className="relative text-center"
    >
      <Image
        className="object-cover object-center w-full rounded lg:w-4/5"
        src={sourceUrl ? sourceUrl : mediaItemUrl}
        alt={slug}
        height={height}
        width={width}
        placeholder="blur"
        blurDataURL={sourceUrl ? sourceUrl : mediaItemUrl}
        /*
        base64 || 
        onLoad={(event) => {
          const target = event.target;
          if (target.src.indexOf("data:image/gif;base64") < 0) {
            setLoaded(true);
          }
        }}
        */
      />
    </div>
  );
};
const ImageContainer = ({ imgarray }) => {
  const [selected, setSelected] = useState(imgarray[0].id || 0);
  useEffect(() => {
    setSelected(imgarray[0].id);
  }, [imgarray]);
  return (
    imgarray.length > 0 && (
      <div className="w-full lg:w-1/2">
        <div className="relative">
          {imgarray.map(
            (item) =>
              selected === item.id && (
                <ImageProduct
                  {...item}
                  key={uniqueId(item.id)}
                />
              )
          )}
        </div>
        <div
          className={`h-24 relative flex flex-row w-2/3 mx-auto space-x-2 items-center justify-center`}
        >
          {imgarray.map((img) => (
            <Vignettes
              img={img}
              setSelected={setSelected}
              key={uniqueId(img.id)}
            />
          ))}
        </div>
      </div>
    )
  );
};

const Vignettes = ({
  img: {
    slug,
    title,
    name,
    id,
    sourceUrl,
    mediaItemUrl,
    mediaDetails: { height, width },
  },
  setSelected,
}) => {
  /*
  const [loaded, setLoaded] = useState(false);
  const animationControls = useAnimation();
  useEffect(() => {
    if (loaded) {
      animationControls.start("loaded");
    }
  }, [loaded]);
  console.log(base64);
  */

  return (
    <div
      className={` w-24 h-24 relative rounded-md transition overflow-hidden`}
      onClick={() => setSelected(id)}
      key={uniqueId(id)}
    >
      <Image
        className=""
        src={sourceUrl ? sourceUrl : mediaItemUrl}
        alt={name || title || slug || "paris est une photo"}
        layout="fill"
        objectFit="cover"
        objectPosition=" center center"
        placeholder="blur"
        blurDataURL={sourceUrl ? sourceUrl : mediaItemUrl}
        // height={height} base64 || 
        //  width={width}
        /*
        onLoad={(event) => {
          const target = event.target;
          if (target.src.indexOf("data:image/gif;base64") < 0) {
            setLoaded(true);
          }
        }}
        */
      />
    </div>
  );
};
export default ImageContainer;
