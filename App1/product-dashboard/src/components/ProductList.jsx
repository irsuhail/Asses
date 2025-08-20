import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onStockChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onStockChange={onStockChange}
        />
      ))}
    </div>
  );
};

export default ProductList;
