const users = [
  { name: "Alice", age: 28, isPremiumMember: true },
  { name: "Bob", age: 17, isPremiumMember: false },
  { name: "Charlie", age: 35, isPremiumMember: true },
  { name: "David", age: 22, isPremiumMember: false },
  { name: "Eva", age: 30, isPremiumMember: true },
];

const result = users
  .filter(user => user.isPremiumMember && user.age >= 25)
  .sort((a, b) => a.age - b.age)
  .map(user => user.name);

console.log(result);
