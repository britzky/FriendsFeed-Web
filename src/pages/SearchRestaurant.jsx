import { useState, useEffect } from 'react'
import { RestaurantCard, Searchbar } from '../components'
import { useAuth } from '../context/AuthContext'
import { useLocation } from '../context/LocationContext'
import { useNavigate } from 'react-router'

export const SearchRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchedRestaurant, setSearchedRestaurant] = useState('');
  const { accessToken } = useAuth();
  const { searchLocation } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`https://colab-test.onrender.com/search_restaurant?name=${searchedRestaurant}&location=${searchLocation}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': "application/json",
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data', response);
        }
        const data = await response.json();
        setRestaurants(data.businesses);
        console.log("These are the restaurants: ", data.businesses);
      } catch (error) {
        console.error("There was a problem fetching restaurant details: ", error);
      }
    }
    fetchRestaurants();
    }, [searchedRestaurant, searchLocation]);


    // function to set the searched restaurant
    const handleSearchRestaurant = (searchedName) => {
      setSearchedRestaurant(searchedName);
    }

  return (
    <div>
      <div>
        <Searchbar
          onSearch={handleSearchRestaurant}
          placeholder="Search Restaurant"
        />
      </div>
      <div>
        {restaurants && restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            name={restaurant.name}
            image={restaurant.image_url}
            address={restaurant.location.display_address.join(', ')}
            onReviewClick={() => navigate(`/review/${restaurant.id}`)}
          />
        ))}
      </div>
    </div>
  )
}
