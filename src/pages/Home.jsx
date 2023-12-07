import { useEffect, useState } from 'react'
import { Searchbar, RatingsDropdown, CuisineFilter, RestaurantList } from '../components'
import { useAuth } from '../context/AuthContext'
import { useRestaurant } from '../context/RestaurantContext'
import { useLocation } from '../context/LocationContext'
import { useReview } from '../context/ReviewContext'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const { userDetails, isLoggedIn, logout } = useAuth();
  const { searchLocation, setSearchLocation } = useLocation();
  const { refreshAvatars } = useReview();
  const { fetchFriendReviewedRestaurants, fetchRestaurantsByCuisine, fetchRestaurantsByFriendRating } = useRestaurant();
  const [cuisine, setCuisine] = useState(null); //state to store selected cuisine
  const [rating, setRating] = useState(null)
  const navigate = useNavigate();

  // Set the location to the user's location set when registering by default
  useEffect(() => {
    if(userDetails && isLoggedIn && !searchLocation){
      setSearchLocation(userDetails.location);
    }
  }, [userDetails, isLoggedIn, searchLocation]);

  // Initial fetch when component mounts and userDetails are available
  useEffect(() => {
    if (userDetails && isLoggedIn) {
      setSearchLocation(userDetails.location);
      fetchFriendReviewedRestaurants();
      refreshAvatars();
    }
  }, [userDetails, isLoggedIn]); // Depend on userDetails and isLoggedIn for the initial fetch

  // Subsequent fetches when searchLocation changes
  useEffect(() => {
    if (searchLocation && (userDetails.location !== searchLocation)) {
      fetchFriendReviewedRestaurants();
      refreshAvatars();
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

  //function to pass searched location to the LocationContext
  const handleSearch = (searchedLocation) => {
    setSearchLocation(searchedLocation);
  }

  //function to pass selected cuisine to the cuisine filter
  const handleCuisineFilter = (selectedCuisine) => {
    setCuisine(selectedCuisine);
  };

  //function to pass selected rating to the ratings dropdown
  const handleRatingSelection = (selectedRating) => {
    //if the selected rating is null, fetch all restaurants
    if (selectedRating === null) {
      fetchFriendReviewedRestaurants(searchLocation);
      refreshAvatars();
    }
    setRating(selectedRating)
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className="flex justify-center min-h-screen w-full mt-14">
      <div className="flex flex-col w-full px-4 md:max-w-md mx-auto">
        <div className="w-full">
          <h1 className="text-4xl font-luckiest text-left text-primaryGreen mb-12">
            Friend's Reviews
          </h1>
        </div>
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
      <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}
