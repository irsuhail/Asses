import './Pagination.css';

function Pagination({currentPage,totalPages,setCurrentPage}) {

    const pages=Array.from({length:totalPages},(_,i)=>i+1);

    return (
        <div className="pagination">
            <button onClick={()=>
            setCurrentPage(prev=>Math.max(prev-1,1))}
            disabled={currentPage===1}>Previous</button>

            {pages.map(num=>(
                <button key={num} onClick={()=>
                    setCurrentPage(num)}
                    className={currentPage===num ? 'active' : ''}>{num}</button>
            ))}


            <button onClick={()=>
                setCurrentPage(prev=>Math.min(prev+1,totalPages))}
                disabled={currentPage===totalPages}>Next</button>
        </div>
    );
}

export default Pagination;