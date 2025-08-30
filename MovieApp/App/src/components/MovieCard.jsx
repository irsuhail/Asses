import React from 'react'

export default function MovieCard({ movie, details }) {
  
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : (details?.Poster || 'https://via.placeholder.com/300x450?text=No+Image')
  const year = movie.Year || (details && details.Year) || '—'
  const genreText = details?.Genre || ''

  return (
    <article className="movie-card bg-white rounded-lg overflow-hidden shadow transition-transform duration-150">
      <div className="aspect-[2/3] bg-gray-100">
        <img src={poster} alt={movie.Title} className="w-full h-full object-cover"/>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{movie.Title}</h3>
        <div className="text-xs text-gray-500">{year}</div>
        {genreText && <div className="text-xs text-gray-400 mt-1 truncate">{genreText}</div>}
      </div>
    </article>
  )
}


