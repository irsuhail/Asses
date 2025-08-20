import React from "react";

const ProductHeader = React.memo(({ total, filter }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">🛍 Product Dashboard</h1>
      <p className="text-gray-600">
        Total: <span className="font-semibold">{total}</span> | Filter:{" "}
        <span className="font-semibold">{filter || "All"}</span>
      </p>
    </div>
  );
});

export default ProductHeader;
