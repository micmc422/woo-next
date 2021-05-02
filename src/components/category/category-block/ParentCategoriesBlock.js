import ProductCategoryBlock from "./ParentCategoryBlock";

const ParentCategoriesBlock = (props) => {
  const { productCategories } = props;

  return (
    <div className="grid grid-cols-1 gap-4 product-categories sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {productCategories?.length
        ? productCategories.map((productCategory, i) => (
            <ProductCategoryBlock
              key={productCategory.id}
              i={i}
              category={productCategory}
            />
          ))
        : ""}
    </div>
  );
};

export default ParentCategoriesBlock;
