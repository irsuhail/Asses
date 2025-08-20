import React, { useState, useMemo } from "react";
import { products as initialProducts } from "./data/products";
import ProductHeader from "./components/ProductHeader";
import FilterSortBar from "./components/FilterSortBar";
import ProductList from "./components/ProductList";
import Summary from "./components/Summary";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (category) result = result.filter((p) => p.category === category);
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, sort]);

  const handleStockChange = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: p.stock > 0 ? p.stock - 1 : 0 } : p
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <ProductHeader total={products.length} filter={category} />
      <FilterSortBar
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />
      <ProductList products={filteredProducts} onStockChange={handleStockChange} />
      <Summary products={filteredProducts} />
    </div>
  );
}

export default App;
