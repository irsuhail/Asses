import React from 'react'

export default function CategoryTabs({ category, setCategory }) {
  
  const tabs = [
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 mt-4">
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setCategory(t.key)}
            className={`px-3 py-1 rounded-md text-sm ${category===t.key ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
