import Link from "next/link";
import Image from "../../../image";
import { DEFAULT_CATEGORY_IMG_URL } from "../../../constants/urls";

const ParentCategoryBlock = (props) => {
  const { category } = props;
  console.log(props);
  return (
    <div className="mb-5 product">
      <Link href={`/category/${category?.slug}`}>
        <a>
          <Image
            className="object-cover h-40 md:h-64"
            layout="fill"
            containerClassNames="w-96 h-56"
            sourceUrl={category?.image?.sourceUrl ?? ""}
            defaultImgUrl={DEFAULT_CATEGORY_IMG_URL}
            altText={category?.image?.altText ?? category.slug}
          />
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
