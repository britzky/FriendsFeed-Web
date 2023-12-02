import React from 'react'
import { avatars } from '../assets/avatars'
import { useReview } from '../context/ReviewContext'
import StarRatings from 'react-star-ratings'

export const ReviewsCard = ({ restaurantId }) => {
  const { reviews } = useReview();
  const restaurantReviews = reviews[restaurantId]

  if (!restaurantReviews || restaurantReviews.length === 0) {
    return <p>No reviews available</p>;
  }

  return (
    <div>
      {restaurantReviews && restaurantReviews.map((review) => (
        <div key={review.id}>
          <img src={avatars[review.profile_picture]} alt={review.profile_picture} className="w-12 h-12 rounded-full object-cover" />
          <h3 className="text-bold text-xl">{review.username}</h3>
          <StarRatings
            rating={parseFloat(review.rating)}
            starRatedColor="black"
            starSpacing='1px'
            starDimension='20px'
            starEmptyColor='lightgray'
            />
            <p>{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
