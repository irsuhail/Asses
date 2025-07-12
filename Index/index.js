const books = [
  { title: "The Silent Sea", author: "James Rollins", sales: [1200, 1300, 1100, 1000, 800, 950, 1400, 1600, 1700, 900, 1000, 1050] },
  { title: "Atomic Habits", author: "James Clear", sales: [800, 950, 970, 1000, 1050, 1100, 980, 1010, 990, 940, 1020, 1005] },
  { title: "The Alchemist", author: "Paulo Coelho", sales: [1800, 1900, 1750, 1600, 1500, 1650, 1700, 1800, 1750, 1600, 1500, 1550] },
  { title: "Zero to One", author: "Peter Thiel", sales: [500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050] },
  { title: "Deep Work", author: "Cal Newport", sales: [1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550] }
];


const topBooks = books
  .map(book => {
    const totalSales = book.sales.reduce((sum, month) => sum + month, 0);
    const avgSales = totalSales / book.sales.length;
    return { ...book, totalSales, avgSales };
  })
  .filter(book => book.avgSales >= 1000)
  .sort((a, b) => b.totalSales - a.totalSales)
  .map(book => book.title);

console.log(topBooks); 


const topSellingBook = books
  .map(book => {
    const totalSales = book.sales.reduce((sum, month) => sum + month, 0);
    return { ...book, totalSales };
  })
  .sort((a, b) => b.totalSales - a.totalSales)[0];

console.log({ title: topSellingBook.title, author: topSellingBook.author });

