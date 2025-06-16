import { useEffect,useState,useRef } from 'react';
import axios from 'axios';

import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import './App.css';

const PRODUCTS_PER_PAGE=6;

function App () {
  const [products, setProducts]=useState([]);
  const [filtered, setFiltered]=useState([1]);
  const [searchTerm, setSearchTerm]=useState('');
  const [category, setCategory]=useState('All');

  const[currentPage,setCurrentPage]=useState(1);
  const searchRef=useRef(null);

  useEffect(()=>{
    axios.get('https://fakestoreapi.com/products')
    .then(res=>{
      setProducts(res.data);
      setFiltered(res.data);
    });
  },[]);


  const handleSearch=(e)=>{
    const value=e.target.value;
    setSearchTerm(value);
    clearTimeout(searchRef.current);
    searchRef.current=setTimeout(()=>{
      filterProducts(value,category);
    },300);
  };


  const handleCategoryChange=(e)=>{
    const selected=e.target.value;
    setCategory(selected);
    filterProducts(searchTerm,selected);
  };

  const filterProducts=(term,cat)=>{
    let filtered=products;

    if (cat!=='All'){
      filtered=filtered.filter(p=>p.category===cat);
    }

    if (term.trim()) {
      filtered=filtered.filter(p=>p.title.toLowerCase().includes(term.toLowerCase())
    );
    }

    setFiltered(filtered);
    setCurrentPage(1);
  };


  const indexOfLast=currentPage+PRODUCTS_PER_PAGE;
  const indexOfFirst=indexOfLast-PRODUCTS_PER_PAGE;

  const currentProducts=filtered.slice(indexOfFirst,indexOfLast);

  const totalPages=Math.ceil(filtered.length/PRODUCTS_PER_PAGE);

  return (
    <div className="container">
      <h1>Product Explorer</h1>

      <div className="controls">
        <input type="text" placeholder="Search products" onChange={handleSearch}/>

        <select onChange={handleCategoryChange}>
          <option>All</option>
          <option>electronics</option>
          <option>jewelery</option>
          <option>men's clothing</option>
          <option>women's clothing</option>
          </select>
          </div>

          <div className="grid">
            {currentProducts.map(product=>(
              <ProductCard key={product.id} product={product}/>

            ))}
            </div>

            <Pagination currentPage={currentPage}
                        totalPages={totalPages}

         setCurrentPage={setCurrentPage}/>               
    </div>
  );
}


export default App;
