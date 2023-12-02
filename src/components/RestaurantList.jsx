import { useEffect } from 'react';
import { RestaurantCard } from './RestaurantCard';
import { useRestaurant } from '../context/RestaurantContext';
import { useFriends } from '../context/FriendContext';
import { useReview } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const RestaurantList = () => {
  const { avatars, fetchAvatars, reviews } = useReview();
  const { restaurants } = useRestaurant();
  const { friends } = useFriends();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (restaurants && Array.isArray(restaurants)) {
      restaurants.forEach((restaurant) => {
        fetchAvatars(restaurant.id, accessToken);
      })
    }
  }, [restaurants, friends, reviews]);

  return (
    <div>
      {restaurants && restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          name={restaurant.name}
          image={restaurant.image_url}
          cuisine={restaurant.categories.map((category) => category.title).join(', ')}
          rating={restaurant.friend_ratings}
          friendAvatars={avatars[restaurant.id]}
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          onReviewClick={() => navigate(`/review/${restaurant.id}`)}
        />
      ))
        }
    </div>
  )
}
