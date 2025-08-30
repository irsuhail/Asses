import { useState, useEffect, useRef } from "react"
import { MyFilter } from "./utils/myFilter" 

const API_KEY = "febb73a3"
const API_URL = "http://www.omdbapi.com/"

export default function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const detailsRef = useRef({})

  // Fetch movies function
  const fetchMovies = async (query) => {
    try {
      const res = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`)
      const data = await res.json()
      if (data.Search) setMovies(data.Search)
      else setMovies([])
    } catch (err) {
      console.error(err)
      setMovies([])
    }
  }

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) fetchMovies(search)
    }, 500)
    return () => clearTimeout(handler)
  }, [search])

  // Filtered movies using MyFilter
  const filteredMovies = MyFilter(movies, (m) => {
    if (yearFilter && !m.Year.startsWith(yearFilter)) return false
    if (genreFilter) {
      const details = detailsRef.current[m.imdbID]
      if (!details || !details.Genre) return false
      const genres = details.Genre.split(",").map(g => g.trim().toLowerCase())
      if (!genres.includes(genreFilter.toLowerCase())) return false
    }
    return true
  })

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <input
        type="text"
        placeholder="Filter by year..."
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <input
        type="text"
        placeholder="Filter by genre..."
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((m) => (
            <div key={m.imdbID} className="border p-2">
              <img src={m.Poster} alt={m.Title} className="w-full h-60 object-cover mb-2" />
              <h3 className="font-bold">{m.Title}</h3>
              <p>{m.Year}</p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  )
}
