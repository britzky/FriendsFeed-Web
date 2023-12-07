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

  // fetch restaurants when searchedRestaurant is set
  useEffect(() => {
    //function to fetch restaurants
    const fetchRestaurants = async () => {
    // check if the searched restaurant is not empty
    if (searchedRestaurant.trim()) {
      // attempt to fetch restaurants
      try {
        const response = await fetch(`https://colab-test.onrender.com/search_restaurant?name=${searchedRestaurant}&location=${searchLocation}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': "application/json",
          }
        });
        // throw error if response is not ok
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
    }
    fetchRestaurants();
    }, [searchedRestaurant]);


    // function to set the searched restaurant
    const handleSearchRestaurant = (searchedName) => {
      setSearchedRestaurant(searchedName);
    }

  return (
    <div className="flex justify-center min-h-screen w-full mt-14">
      <div className="flex flex-col w-full px-4 md:max-w-lg mx-auto">
        <h1 className="text-4xl my-3 font-luckiest text-center text-primaryGreen">Search for Restaurants to review</h1>
        <div className="w-full">
          <Searchbar
            onSearch={handleSearchRestaurant}
            placeholder="Search Restaurant"
          />
        </div>
        <div className="mt-7">
          {restaurants.length === 0 && <p className="italic mt-7">Restaurants you want to review will appear here</p>}
          {restaurants.length > 0 && restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              image={restaurant.image_url}
              address={restaurant.location.display_address.join(', ')}
              onReviewClick={restaurant && (() => navigate(`/review/${restaurant.id}`))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
