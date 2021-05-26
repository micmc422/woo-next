import Product from "../Product";

const DisplayProducts = ({ isLoading, filteredProducts }) => {
  if (isLoading) {
    return [...Array(24).keys()].map((key) => (
      <Product key={key} product={key} />
    ));
  }
  if (filteredProducts?.length > 0) {
    return filteredProducts.map((product) => (
      <Product key={product?.id} product={product} />
    ));
  }

  return <div> aucun résultat</div>;
};

export default DisplayProducts;
