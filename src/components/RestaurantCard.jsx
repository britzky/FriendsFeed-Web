import React from 'react'
import { avatars } from '../assets/avatars'
import StarRatings from 'react-star-ratings'

export const RestaurantCard = ({ onClick, onReviewClick, name, image, cuisine, rating, address, friendAvatars}) => {

  return (
    <div>
      <div onClick={onClick}>
        {image && <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />}
        <div>

        </div>
          <h3 className="text-bold text-xl">{name}</h3>
        {friendAvatars && (
        <div className="flex items-end w-full">
          <div className="flex -space-x-5">
            {friendAvatars.slice(0, 5).map((avatar, index) => (
              <img
                key={index}
                src={avatars[avatar]}
                alt={avatar}
                className="w-8 h-8 rounded-full object-cover"
              />
            ))}
          </div>
          <p className="ml-1 italic">Friends overall rating</p>
        </div>
        )}
        {rating && (
          <div>
          <StarRatings
            rating={parseFloat(rating)}
            starRatedColor="black"
            starSpacing='1px'
            starDimension='20px'
            starEmptyColor='lightgray'
          />
          </div>
        )}
        {cuisine && <p>{cuisine}</p>}
        {address && <p>{address}</p>}
    </div>
      <button onClick={onReviewClick} className="px-4 py-2 text-center w-full bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-3">Write a Review</button>
      <div className="border-b border-gray-400 w-full my-7"></div>
    </div>
    )
}
