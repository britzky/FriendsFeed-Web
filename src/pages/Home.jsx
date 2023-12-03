import { useEffect, useState } from 'react'
import { Searchbar, RatingsDropdown, CuisineFilter, RestaurantList } from '../components'
import { useAuth } from '../context/AuthContext'
import { useRestaurant } from '../context/RestaurantContext'
import { useLocation } from '../context/LocationContext'

export const Home = () => {
  const { logout, userDetails, isLoggedIn } = useAuth();
  const { searchLocation, setSearchLocation } = useLocation();
  const { fetchFriendReviewedRestaurants, fetchRestaurantsByCuisine, fetchRestaurantsByFriendRating } = useRestaurant();
  const [cuisine, setCuisine] = useState(null); //state to store selected cuisine
  const [rating, setRating] = useState(null)

  // Set the location to the user's location set when registering by default
  useEffect(() => {
    console.log('Effect triggered: ', { userDetails, isLoggedIn, searchLocation });
    if(userDetails && isLoggedIn && !searchLocation){
      setSearchLocation(userDetails.location);
    }
  }, [userDetails, isLoggedIn, searchLocation]);

  // Initial fetch when component mounts and userDetails are available
  useEffect(() => {
    if (userDetails && isLoggedIn) {
      setSearchLocation(userDetails.location);
      fetchFriendReviewedRestaurants(userDetails.location);
    }
  }, [userDetails, isLoggedIn]); // Depend on userDetails and isLoggedIn for the initial fetch

  // Subsequent fetches when searchLocation changes
  useEffect(() => {
    if (searchLocation && (userDetails.location !== searchLocation)) {
      fetchFriendReviewedRestaurants(searchLocation);
    }
  }, [searchLocation])

  // fetch restaurants when cuisine is set
  useEffect(() => {
    if (cuisine && searchLocation) {
      fetchRestaurantsByCuisine(searchLocation, cuisine);
    }
  }, [cuisine, searchLocation]);

  //fetch restaurants when rating is set
  useEffect(() => {
    if (rating) {
      fetchRestaurantsByFriendRating(rating);
    }
  }, [rating]);

  const handleLogout = () => {
    logout();
  }

  //function to pass searched location to the LocationContext
  const handleSearch = (searchedLocation) => {
    setSearchLocation(searchedLocation);
  }

  //function to pass selected cuisine to the cuisine filter
  const handleCuisineFilter = (selectedCuisine) => {
    setCuisine(selectedCuisine);
  };

  const handleRatingSelection = (selectedRating) => {
    console.log('selected rating: ', selectedRating);
    setRating(selectedRating)
  }

  return (
    <div className="flex justify-center min-h-screen w-full mt-14">
      <div className="flex flex-col w-full px-4 md:max-w-lg mx-auto">
        <div>
          <Searchbar
            placeholder="Search Location (ex. Brooklyn, NY)"
            onSearch={handleSearch}
            className="w-full"
          />
        </div>
      <div className="my-7 space-x-5">
        <RatingsDropdown onRatingSelect={handleRatingSelection} />
        <CuisineFilter onSelectCuisine={handleCuisineFilter} />
      </div>
      <div className="overflow-auto">
        <RestaurantList />
      </div>
      </div>
    </div>
  )
}
