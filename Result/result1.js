const products = [
  { name: "Phone", category: "Electronics", ratings: [5, 4, 4] },
  { name: "Jeans", category: "Clothing", ratings: [4, 3, 5, 2] },
  { name: "Laptop", category: "Electronics", ratings: [5, 5, 5, 4] },
];

const result = products
  .map(product => {
    const total = product.ratings.reduce((sum, r) => sum + r, 0);
    const avg = total / product.ratings.length;
    return { name: product.name, averageRating: avg };
  })
  .filter(product => product.averageRating >= 4.5)
  .sort((a, b) => b.averageRating - a.averageRating);

console.log(result);
