
import React from "react";

const ProductCard = React.memo(({ product, onStockChange }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>
      <p className="text-sm mt-2">Stock: {product.stock}</p>

      <button
        onClick={() => onStockChange(product.id)}
        className="mt-3 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Reduce Stock
      </button>
    </div>
  );
});

export default ProductCard;
