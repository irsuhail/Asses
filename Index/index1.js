const products = [
  { name: "Laptop", price: 60000, discount: 10 },
  { name: "Smartphone", price: 25000, discount: 15 },
  { name: "Tablet", price: 18000, discount: 5 },
  { name: "Smartwatch", price: 8000, discount: 20 }
];


const discountedPrices = products.map(
  ({ name, price, discount }) =>
    `${name}: ₹${Math.round(price * (1 - discount / 100))}`
);

console.log(discountedPrices);

const highDiscountProducts = products.filter(({ discount }) => discount >= 15);

console.log(highDiscountProducts);

