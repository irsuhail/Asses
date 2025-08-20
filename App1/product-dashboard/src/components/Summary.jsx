import React, { useMemo } from "react";

const Summary = ({ products }) => {
  const totalPrice = useMemo(() => {
    return products.reduce((sum, p) => sum + p.price, 0);
  }, [products]);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold">Summary</h2>
      <p className="text-gray-600">Total Price: ${totalPrice}</p>
    </div>
  );
};

export default Summary;


