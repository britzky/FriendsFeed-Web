import { useEffect } from 'react';
import { RestaurantCard, ReviewsCard } from '../components';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useReview } from '../context/ReviewContext';
import { useRestaurant } from '../context/RestaurantContext';


export const Restaurant = () => {
  const { accessToken } = useAuth();
  const { id } = useParams();
  const { fetchRestaurantById, restaurant } = useRestaurant();
  const { fetchReviews, avatars } = useReview();
  const navigate = useNavigate();

  // fetch reviews and avatars when accessToken changes
  useEffect(() => {
    fetchReviews(id, accessToken);
  }, [accessToken]);

  // fetch individual restaurant when id changes
  useEffect(() => {
    fetchRestaurantById(id);
  }, [id]);

  return (
    <div className="flex justify-center min-h-screen w-full my-14">
      <div className="flex flex-col justify-center w-full px-4 md:max-w-lg mx-auto">
          {restaurant && (
          <div key={id} className="w-full">
            <RestaurantCard
              name={restaurant.name}
              image={restaurant.image_url}
              cuisine={restaurant.categories.map((category) => category.title).join(', ')}
              rating={restaurant.friend_ratings}
              address={restaurant.location.display_address.join(', ')}
              onReviewClick={restaurant && (() => navigate(`/review/${restaurant.id}`))}
              friendAvatars={avatars[restaurant.id]}
            />
          </div>
            )}
        <div>
          <ReviewsCard restaurantId={id} />
        </div>
      </div>
    </div>
  )
}
