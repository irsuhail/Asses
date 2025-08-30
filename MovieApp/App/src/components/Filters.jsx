import React, { useEffect, useState } from 'react'

export default function Filters({ year, setYear, genre, setGenre, availableGenres }) {
  
  return (
    <div className="max-w-6xl mx-auto px-4 mt-4 flex gap-3 items-center">
      <div>
        <input
          type="number"
          value={year}
          onChange={e => setYear(e.target.value)}
          placeholder="Year (e.g. 2023)"
          className="px-3 py-2 rounded-md border w-36"
        />
      </div>

      <div>
        <select value={genre} onChange={e => setGenre(e.target.value)} className="px-3 py-2 rounded-md border">
          <option value="">All Genres</option>
          {availableGenres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="ml-auto text-sm text-gray-500">
        (Genre filter requires fetching details; results may take a moment)
      </div>
    </div>
  )
}
