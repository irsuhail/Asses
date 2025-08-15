import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleDropdownChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  return (
    <div className="container">
      <h1>Pagination Example</h1>

      <ul className="item-list">
        {currentItems.map((item) => (
          <li key={item.id}>
            <strong>{item.id}.</strong> {item.title}
          </li>
        ))}
      </ul>

      <div className="pagination">
       
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageClick(num)}
            className={currentPage === num ? "active" : ""}
          >
            {num}
          </button>
        ))}

        
        <select value={currentPage} onChange={handleDropdownChange}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              Page {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
