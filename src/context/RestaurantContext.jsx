import React, { useState, useContext, createContext, useCallback } from 'react'
import { useAuth } from './AuthContext'

const RestaurantContext = createContext()

export const useRestaurant = () => {
    return useContext(RestaurantContext)
}

export const RestaurantProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]); // for storing the list of restaurants
    const [restaurant, setRestaurant] = useState(null); // for storing the individual restaurant details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateRestaurants, setUpdateRestaurants] = useState(false); // Added this state to update the restaurants list after a review is posted
    const { accessToken } = useAuth();

    const fetchFriendReviewedRestaurants = useCallback(async (location) => {
        try {
            setLoading(true);
            setRestaurants([]);
            const response = await fetch(`https://colab-test.onrender.com/restaurants/friend-reviewed?location=${location}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': "application/json",
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRestaurants(data);
            } else {
                const errorText = await response.text();
                setError(new Error(`Failed to fetch data: ${errorText}`));
            }
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [accessToken]);

    const fetchRestaurantsByCuisine = async (location, cuisine) => {
        console.log('Attempting to Fetch restaurants with specific cuisine for location: ', location, cuisine)
        try {
            setLoading(true);
            setRestaurants([]);
            const response = await fetch(`https://colab-test.onrender.com/restaurants-cuisine?location=${location}&cuisine=${cuisine}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': "application/json",
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRestaurants(data);
            } else {
                const errorText = await response.text();
                setError(new Error(`Failed to fetch data: ${errorText}`));
            }
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // function to pass selected rating to the ratings dropdown
    const fetchRestaurantsByFriendRating = async (rating) => {
        console.log('Attempting to Fetch restaurants with specific rating: ', rating)
        try {
            setLoading(true);
            setRestaurants([]);
            const response = await fetch(`https://colab-test.onrender.com/restaurants-by-friend-rating?rating=${rating}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('These are the restaurants', data);
            setRestaurants(data);
        } else {
            console.log('Error fetching restaurants:', response.status, await response.text());
        }
        } catch (error) {
        console.error('Error fetching restaurants:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchRestaurantById = useCallback(async (restaurantId) => {
        try {
            setLoading(true);
            const response = await fetch(`https://colab-test.onrender.com/restaurants/${restaurantId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': "application/json",
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRestaurant(data);
                console.log('Restaurant details: ', data);
            } else {
                const errorText = await response.text();
                setError(new Error(`Failed to fetch data: ${errorText}`));
            }
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [accessToken]);

    const refreshRestaurants = () => {
        console.log('Refreshing restaurants');
        setUpdateRestaurants(prev => !prev);
    }

    const contextValue = {
        restaurants,
        restaurant,
        loading,
        error,
        fetchFriendReviewedRestaurants,
        fetchRestaurantsByCuisine,
        fetchRestaurantsByFriendRating,
        fetchRestaurantById,
        refreshRestaurants,
        updateRestaurants
    };

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  )
}

