import Link from "next/link";

const CategoryBlocs = (props) => {
  const { category } = props;
  return (
    <div className="mb-5 product">
      <Link href={`/categorie/${category.slug}`}>
        <a>
          <img
            className="object-cover h-40 md:h-64"
            src={category?.image?.sourceUrl ? category.image.sourceUrl : ""}
            srcSet={category?.image?.srcSet ? category.image.srcSet : ""}
            alt="ParentCategoryBlock image"
          />
          <div className="p-3 product-title-container">
            <h3 className="text-lg font-medium product-title">
              {category.name}
            </h3>
            <span className="text-sm shop-now">+ Explore</span>
          </div>
        </a>
      </Link>

      {/*<div className="text-center card-body">*/}
      {/*	<h6 className="mb-3 card-subtitle">Hello</h6>*/}
      {/*</div>*/}
    </div>
  );
};

export default CategoryBlocs;
