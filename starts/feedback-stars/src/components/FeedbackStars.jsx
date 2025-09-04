import { useState } from "react"
import "./FeedbackStars.css"

export default function FeedbackStars({ numberOfStars = 5, onRatingChange }) {
  const [rating, setRating] = useState(
    Number(localStorage.getItem("rating")) || 0
  )
  const [hover, setHover] = useState(0)

  const handleClick = (value) => {
    setRating(value)
    localStorage.setItem("rating", value)
    if (onRatingChange) onRatingChange(value)
  }

  const handleClear = () => {
    setRating(0)
    localStorage.removeItem("rating")
    if (onRatingChange) onRatingChange(0)
  }

  return (
    <div className="feedback-container">
      <div className="stars">
        {[...Array(numberOfStars)].map((_, i) => {
          const value = i + 1
          return (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className={`star ${value <= (hover || rating) ? "filled" : ""}`}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleClick(value)}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 
              1 0 00.95.69h3.462c.969 0 1.371 1.24.588 
              1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 
              3.292c.3.921-.755 1.688-1.54 
              1.118L10 13.347l-2.887 
              2.134c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
              1 0 00-.364-1.118L3.48 
              8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 
              1 0 00.95-.69l1.07-3.292z" />
            </svg>
          )
        })}
      </div>

      <p className="rating-text">
        {rating > 0
          ? `You rated: ${rating}/${numberOfStars}`
          : "No rating selected"}
      </p>

      {rating > 0 && (
        <button className="clear-btn" onClick={handleClear}>
          Clear Rating
        </button>
      )}
    </div>
  )
}
