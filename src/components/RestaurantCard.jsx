import React from 'react'
import { avatars } from '../assets/avatars'
import StarRatings from 'react-star-ratings'

export const RestaurantCard = ({ onClick, onReviewClick, name, image, cuisine, rating, address, friendAvatars}) => {

  return (
    <div onClick={onClick}>
      {image && <img src={image} alt={name} className="w-full h-48 object-cover" />}
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
        <StarRatings
          rating={rating}
          starRatedColor="black"
          starSpacing='1px'
          numberOfStars={5}
          starDimension='20px'
          starEmptyColor='black'
        />
      )}
      {cuisine && <p>{cuisine}</p>}
      {address && <p>{address}</p>}
      <button onClick={onReviewClick}>Write a Review</button>
    </div>
  )
}
