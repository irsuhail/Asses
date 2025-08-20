import React from "react";

const FilterSortBar = ({ category, setCategory, sort, setSort }) => {
  return (
    <div className="flex gap-4 my-4">
      <select
        className="border p-2 rounded-lg bg-white shadow"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Kitchen">Kitchen</option>
      </select>

      <select
        className="border p-2 rounded-lg bg-white shadow"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>
    </div>
  );
};

export default FilterSortBar;
