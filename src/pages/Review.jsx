import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useReview } from '../context/ReviewContext';
import { useRestaurant } from '../context/RestaurantContext';
import StarRatings from 'react-star-ratings';

export const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { postReview, reviewPosted, resetReviewPosted } = useReview();
  const { refreshRestaurants, fetchRestaurantById, restaurant } = useRestaurant();
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
    refreshRestaurants();
  }

  // fetch individual restaurant when id changes
  useEffect(() => {
    fetchRestaurantById(id);
  }, [id])

  // navigate to home page when review is posted
  useEffect(() => {
    if (reviewPosted) {
      resetReviewPosted();
      navigate('/home');
    }
  }, [reviewPosted]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="mx-4 md:mx-0">
        <div>
          <p className="text-2xl text-bold mb-3">{restaurant.name}</p>
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
            className="w-full h-48 border-2 border-gray-200 rounded-md p-2 my-10"
            placeholder="Write a review..."
            onChange={(e) => handleCommentChange(e.target.value)}
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
            >
            Post Review
          </button>
          </div>

      </div>
    </div>
  )
}
