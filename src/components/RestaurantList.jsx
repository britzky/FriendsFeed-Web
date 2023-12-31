import { useEffect } from 'react';
import { RestaurantCard } from './RestaurantCard';
import { useRestaurant } from '../context/RestaurantContext';
import { useFriends } from '../context/FriendContext';
import { useReview } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const RestaurantList = () => {
  const { avatars, reviews, refreshAvatars } = useReview();
  const { restaurants } = useRestaurant();
  const { friends } = useFriends();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    refreshAvatars();
  }, [restaurants, friends, reviews]);

  return (
    <div className="w-full">
      {restaurants && restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          name={restaurant.name}
          image={restaurant.image_url}
          cuisine={restaurant.categories.map((category) => category.title).join(', ')}
          rating={restaurant.friend_ratings}
          friendAvatars={avatars[restaurant.id]}
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          onReviewClick={restaurant && (() => navigate(`/review/${restaurant.id}`))}
        />
      ))
        }
    </div>
  )
}
