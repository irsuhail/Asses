
const API_KEY = 'febb73a3'
const BASE = 'https://www.omdbapi.com/'


const detailsCache = new Map()

export async function searchMovies(query, page = 1) {

  const q = encodeURIComponent(query || '')
  const url = `${BASE}?apikey=${API_KEY}&s=${q}&page=${page}`
  const res = await fetch(url)
  const data = await res.json()
  
  return data
}

export async function getMovieDetails(imdbID) {
  if (!imdbID) return null
  if (detailsCache.has(imdbID)) return detailsCache.get(imdbID)
  const url = `${BASE}?apikey=${API_KEY}&i=${imdbID}&plot=short`
  const res = await fetch(url)
  const data = await res.json()
  if (data && data.Response === 'True') {
    detailsCache.set(imdbID, data)
    return data
  }
  return null
}
