import Link from "next/link";
import Image from "../../../image";
import { DEFAULT_CATEGORY_IMG_URL } from "../../../constants/urls";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ParentCategoryBlock = (props) => {
  const { category, i } = props;
  const [activeImage, setActiveImage] = useState(0);
  console.log(i);
  let images = [];
  const delay = 1500 + ((300 * i) % 3000);
  if (category.products.nodes) {
    category.products.nodes.map((product) => {
      product?.galleryImages?.nodes[0]?.sourceUrl;
      images.push(product.galleryImages.nodes[0].sourceUrl);
    });
  }
  if (category?.image) {
    console.log(category?.image);
    images.push(category?.image?.sourceUrl);
  }
  useEffect(() => {
    /*
    console.log(i);
    */
    const timer = window.setInterval(() => {
      setActiveImage((activeImage + 1) % images.length);
    }, delay);
    return () => {
      window.clearInterval(timer);
    };
  }, [images]);
  return (
    <div className="mb-5 product">
      <Link href={`/category/${category?.slug}`}>
        <a>
          <div className="relative block w-full h-64 md:h-96">
            {" "}
            <AnimatePresence>
              <motion.div
                className="absolute inset-0"
                key={`image-${category.slug}-${activeImage}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Image
                  className="object-cover h-64 md:h-96"
                  layout="fill"
                  containerClassNames="w-full h-64 md:h-96 max-w-full"
                  sourceUrl={images[activeImage] ?? ""}
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
            <span className="text-sm shop-now">+ Explore</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ParentCategoryBlock;
