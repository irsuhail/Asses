const books = [
  { title: "Book A", genre: "Fiction", price: 250, unitsSold: 120, author: "Author 1", yearPublished: 2015 },
  { title: "Book B", genre: "Science", price: 300, unitsSold: 75, author: "Author 2", yearPublished: 2020 },
  { title: "Book C", genre: "Fiction", price: 200, unitsSold: 200, author: "Author 1", yearPublished: 2010 },
  { title: "Book D", genre: "History", price: 400, unitsSold: 60, author: "Author 3", yearPublished: 2018 },
  { title: "Book E", genre: "Science", price: 150, unitsSold: 90, author: "Author 2", yearPublished: 2016 },
  { title: "Book F", genre: "Fiction", price: 350, unitsSold: 80, author: "Author 4", yearPublished: 2021 },
  { title: "Book G", genre: "History", price: 280, unitsSold: 110, author: "Author 3", yearPublished: 2013 },
  { title: "Book H", genre: "Science", price: 200, unitsSold: 130, author: "Author 5", yearPublished: 2017 },
];

const result = books
  .filter(book =>
    book.yearPublished > 2015 &&
    (book.genre === "Science" || book.genre === "Fiction")
  )
  .map(book => ({
    title: book.title,
    author: book.author,
    genre: book.genre,
    totalRevenue: book.price * book.unitsSold
  }))
  .sort((a, b) => b.totalRevenue - a.totalRevenue);

console.log(result);
