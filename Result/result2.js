const orders = [
  {
    customerName: "Meena",
    items: [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ],
  },
  {
    customerName: "Sanjay",
    items: [
      { price: 400, quantity: 1 },
      { price: 100, quantity: 2 },
    ],
  },
  {
    customerName: "Amit",
    items: [
      { price: 50, quantity: 3 },
    ],
  },
];

const result = orders
  .map(order => {
    const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { customerName: order.customerName, totalAmount };
  })
  .filter(order => order.totalAmount > 200)
  .sort((a, b) => b.totalAmount - a.totalAmount);

console.log(result);
