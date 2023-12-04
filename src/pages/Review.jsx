import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useReview } from '../context/ReviewContext';
import { useRestaurant } from '../context/RestaurantContext';
import { useLocation } from 'react-router';
import StarRatings from 'react-star-ratings';

export const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { postReview, fetchAvatars } = useReview();
  const { fetchFriendReviewedRestaurants, fetchRestaurantById, restaurant } = useRestaurant();
  const { searchLocation } = useLocation();
  const { accessToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  //update comment when comment is changed
  const handleCommentChange = (comment) => {
    setComment(comment);
  }

  //post review when submit button is clicked
  const handleSubmit = async () => {
    await postReview(id, rating, comment, accessToken);
    await fetchFriendReviewedRestaurants(searchLocation);
    await fetchAvatars(id, accessToken);
    navigate('/home');
  }

  // fetch individual restaurant when id changes
  useEffect(() => {
    fetchRestaurantById(id);
  }, [id])
  // if the restaurant is not available, show loading
  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="mx-4 md:mx-0">
        <div>
          <p className="text-2xl font-bold mb-3">{restaurant.name}</p>
        </div>
        <div>
          <StarRatings
            rating={rating}
            starRatedColor="black"
            starHoverColor='black'
            starSpacing='1px'
            starDimension='25px'
            starEmptyColor='lightgray'
            changeRating={(rating) => setRating(rating)}
          />
        </div>
        <div className="my-5 text-center">
          <p className="mt-12">Share some deatils of your experience. Consider food, ambience and service.</p>
          <textarea
            className="w-full h-48 border-2 border-primaryGreen rounded-md p-2 my-10"
            placeholder="Write a review..."
            onChange={(e) => handleCommentChange(e.target.value)}
          />

          <button
            className="px-4 py-2 text-center w-full bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen"
            onClick={handleSubmit}
            >
            Post Review
          </button>
          </div>

      </div>
    </div>
  )
}
