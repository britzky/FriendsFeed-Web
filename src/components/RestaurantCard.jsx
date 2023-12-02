import React from 'react'
import { avatars } from '../assets/avatars'
import StarRatings from 'react-star-ratings'

export const RestaurantCard = ({ onClick, onReviewClick, name, image, cuisine, rating, address, friendAvatars}) => {

  return (
    <div onClick={onClick}>
      {image && <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />}
      {friendAvatars && (
        <div className="flex">
          {friendAvatars.map((avatar, index) => (
            <img
              key={index}
              src={avatars[avatar]}
              alt={avatar}
              className="w-12 h-12 rounded-full object-cover"
            />
          ))}
        </div>
      )}
      <h3 className="text-bold text-xl">{name}</h3>
      {rating && (
        <div className="my-2">
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
      <button onClick={onReviewClick} className="px-4 py-2 text-center w-full bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10">Write a Review</button>
      <div className="border-b border-gray-400 w-full my-7"></div>
    </div>
  )
}
