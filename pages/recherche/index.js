import { useState } from "react";
import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import InputField from "../../src/components/checkout/form-elements/InputField";
import ImageWithFallback from "../../src/components/ImageFallBack";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Recherche = ({}) => {
  return (
    <Layout>
      <div className="container px-4 mx-auto my-16 checkout xl:px-0">
        <h1 className="mb-5 text-6xl font-black uppercase">Recherche</h1>
        <SearchContainer />
      </div>
    </Layout>
  );
};

const SearchContainer = () => {
  const router = useRouter();
  const { search } = router.query;
  const { locale } = useRouter();
  const { data, error } = useSWR(
    search?.length > 0
      ? `/api/products/?locale=${locale}&search=${search}`
      : null,
    fetcher
  );
  const handleOnChange = (event) => {
    const { target } = event || {};
    router.query.search = target.value;
    router.replace(router);
  };
  return (
    <div className="flex flex-col space-y-8 sm:-mx-3">
      <InputField
        name="search"
        inputValue={search}
        handleOnChange={handleOnChange}
        label="Votre recherche"
        // errors={errors}
        // isShipping={isShipping}
        containerClassNames="w-full sm:my-2 sm:px-2 md:w-1/2 mx-auto"
      />
      {data?.products?.nodes ? (
        <Result resList={data?.products?.nodes} />
      ) : (
        <NoResult />
      )}
    </div>
  );
};

const NoResult = () => {
  return <div>Aucun résultat</div>;
};
const Result = ({ resList }) => {
  console.log(resList);
  return (
    <div className={`grid grid-cols-2`}>
      {resList.map((item) => (
        <ResItem {...item} />
      ))}
    </div>
  );
};
const ResItem = ({
  name,
  image,
  price,
  slug,
  averageRating,
  galleryImages,
}) => {
  const orientation = galleryImages?.nodes[0]
    ? galleryImages?.nodes[0].mediaDetails.width >
      galleryImages?.nodes[0].mediaDetails.height
      ? "cover"
      : "contain"
    : image?.mediaDetails &&
      image.mediaDetails.width > image.mediaDetails.height
    ? "cover"
    : "contain";
  const imageUrlPrimaire = galleryImages?.nodes[0]
    ? galleryImages?.nodes[0].mediaItemUrl
    : image?.sourceUrl;

  return (
    <Link href={`/galerie-photo/${slug}`} passHref>
      <a
        className={`flex flex-row items-center space-x-4 pb-4 cursor-pointer`}
      >
        <div className={`relative w-24 h-16`}>
          <ImageWithFallback
            src={imageUrlPrimaire}
            slug={slug}
            alt="Product image"
            layout="fill"
            objectfit={orientation}
          />
        </div>
        <div className="">
          <h2>{name}</h2>
          <div>{price}</div>
        </div>
        <div>{averageRating > 0 && averageRating} </div>
      </a>
    </Link>
  );
};
export default Recherche;
