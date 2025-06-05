import React from "react";
import ProductsSlider from "./productsSlider";

const CakesSlider = ({ products, addToCart }) => (
  <ProductsSlider
    products={products}
    title="Мои торты"
    productType="cake"
    addToCart={addToCart}
  />
);

export default CakesSlider;
