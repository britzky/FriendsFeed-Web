import { useEffect } from 'react'
import { Searchbar, RatingsDropdown, CuisineFilter, RestaurantList } from '../components'
import { useAuth } from '../context/AuthContext'
import { useRestaurant } from '../context/RestaurantContext'
import { useLocation } from '../context/LocationContext'

export const Home = () => {
  const { logout } = useAuth();
  const { location, setLocation } = useLocation();
  const { fetchFriendReviewedRestaurants } = useRestaurant();

  const handleLogout = () => {
    logout();
  }

  const handleSearch = (searchedLocation) => {
    setLocation(searchedLocation);
  }

  return (
    <div className="flex justify-center h-screen mt-14">
      <div className="flex flex-col max-w-md">
      <Searchbar
        placeholder="Search Location (ex. Brooklyn, NY)"
        className="w-full"
      />
      <div className="mt-3 space-x-5">
        <RatingsDropdown />
        <CuisineFilter />
      </div>
      <div>
        <RestaurantList />
      </div>
      <button
        className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10 w-96"
        onClick={handleLogout}
      >
        Logout
      </button>
      </div>
    </div>
  )
}
