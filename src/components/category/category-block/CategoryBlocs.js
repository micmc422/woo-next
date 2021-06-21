import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Bouton, ThemeH5 } from "../../themeComponents";

const CategoryBlocs = (props) => {
  const { category } = props;
  const { t } = useTranslation("shop");
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
            <ThemeH5>{category.name}</ThemeH5>
            <Bouton>
              <span className="text-sm shop-now">{t("explorer")}</span>
            </Bouton>
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
