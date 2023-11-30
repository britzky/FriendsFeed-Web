import React from 'react'
import { FaStar } from 'react-icons/fa'

export const RatingsDropdown = () => {
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} className="text-black m-0.5" />
    ));
  }
  return (
    <div className="p-2.5">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          className="flex items-center p-1"
          onClick={() => onRatingSelect(rating)}
        >
          {renderStars(rating)}
        </button>
      ))}
    </div>
  )
}
