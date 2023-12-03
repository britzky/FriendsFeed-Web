import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FaChevronDown } from 'react-icons/fa'

export const RatingsDropdown = ({ onRatingSelect }) => {
  const [open, setOpen] = useState(false)

  // function to toggle the dropdown
  const toggleDropdown = () => {
    setOpen(!open)
  }

  // function to render the stars
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} className="text-black m-0.5" />
    ));
  }

  //function to reset the filter
  const handleRatingSelect = (rating) => {
    onRatingSelect(rating)
    toggleDropdown()
  }

  //function to reset the filter
  const resetFilter = () => {
    onRatingSelect(null)
    toggleDropdown()
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-black bg-white hover:bg-gray-100 border-2 border-secondaryGreen focus:outline-none focus:ring-primaryGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Ratings
        <FaChevronDown className="ml-2" aria-hidden="true" />
      </button>
      {open && (
        <div
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-1"
          style={{ display: 'block' }}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {[1, 2, 3, 4, 5].map((rating) => (
              <li
                key={rating}
                className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleRatingSelect(rating)}
              >
                {renderStars(rating)}
              </li>
            ))}
            <li
              className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-bold"
              onClick={() => resetFilter()}
            >
              Reset Filter
            </li>
          </ul>
      </div>
      )}
    </div>
  )
}
