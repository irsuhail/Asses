import React, { useState, useRef } from 'react'

export default function Navbar({ onSearch }) {
  const [value, setValue] = useState('')
  const debRef = useRef(null)

  // debounce 500ms
  function handleChange(e) {
    const v = e.target.value
    setValue(v)
    if (debRef.current) clearTimeout(debRef.current)
    debRef.current = setTimeout(() => {
      onSearch(v.trim())
    }, 500)
  }

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="text-2xl font-bold text-indigo-600">Movie Explorer</div>
        <div className="ml-auto w-full max-w-xl">
          <input
            type="search"
            value={value}
            onChange={handleChange}
            placeholder="Search movies..."
            className="w-full px-3 py-2 rounded-md border focus:outline-none"
          />
        </div>
      </div>
    </header>
  )
}
