import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useRestaurant } from './RestaurantContext';
import { useAuth } from './AuthContext';

const ReviewContext = createContext();

export const useReview = () => {
    return useContext(ReviewContext);
}

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState({}); // fetch all reviews for the restaurant selected
    const [avatars, setAvatars] = useState({}); // fetch all avatars for friends who have reviewed the restaurant
    const [fetchedRestaurants, setFetchedRestaurants] = useState(new Set()); // To track fetched restaurants
    const [reviewPosted, setReviewPosted] = useState(false); // To track if a review has been posted
    const { restaurants } = useRestaurant();
    const { accessToken } = useAuth();

    // extract the restaurantId from the restaurant object
    const restaurantIds = useMemo(() => restaurants.map(restaurant => restaurant.id), [restaurants]);

    // fetch all friend-reviews for the restaurant selected
    const fetchReviews = useCallback(async (restaurantId, accessToken) => {
        try {
            const response = await fetch(
                `https://colab-test.onrender.com/restaurants/${restaurantId}/friend-reviews`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
                if (response.ok) {
                    const data = await response.json();
                    console.log("These are the reviews", data);
                    setReviews(prevReviews => ({ ...prevReviews, [restaurantId]: data }));
                    setFetchedRestaurants(prev => {
                        console.log(`Current fetched restaurants before update: ${Array.from(prev).join(', ')}`);
                        const newSet = new Set(prev);
                        newSet.add(restaurantId);
                        return newSet;
                    });
                } else {
                    console.log("Error fetching reviews:", response.status, await response.text());
                }
            } catch (error) {
                console.log("Caught an error fetching reviews: ", error);
            }
        }, [fetchedRestaurants]);

        // fetch all friend-avatars for the restaurant selected
        const fetchAvatars = useCallback(async () => {
            if (restaurantIds.length === 0) {
                return;
            }
            restaurantIds.forEach(async (restaurantId) => {
                if (fetchedRestaurants.has(restaurantId)) {
                    return;
                }
                    try {
                        const response = await fetch(
                            `https://colab-test.onrender.com/restaurants/${restaurantId}/friend-avatars`,
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );
                        if (response.ok) {
                            const data = await response.json();
                            setAvatars(prevAvatars => ({
                                ...prevAvatars,
                                [restaurantId]: data // Replace existing avatars with new data
                            }));
                            setFetchedRestaurants(prev => new Set(prev.add(restaurantId)));
                        } else {
                            console.log("Error fetching avatars:", response.status, await response.text());
                        }

                    } catch (error) {
                        console.log(error);
                    }
                }
            );
        }, [fetchedRestaurants, restaurantIds]);

        const postReview = useCallback(async (restaurantId, rating, comment, accessToken) => {
            try {
                const response = await fetch(
                    "https://colab-test.onrender.com/review/create",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            yelp_restaurant_id: restaurantId,
                            rating,
                            comment,
                        }),
                    }
                );
                const result = await response.json();
                if (response.ok) {
                    setReviewPosted(true);
                    setFetchedRestaurants(prev => new Set([...prev].filter(id => id !== restaurantId)));
                    // trigger re-fetch of avatars
                    fetchAvatars(restaurantId, accessToken);
                }
            } catch (error) {
                console.error("Error posting review", error);
            }
        }, []);

        //function to reset the reviewPosted state
        const resetReviewPosted = useCallback(() => {
            setReviewPosted(false);
        }, []);

        // function to rerun the fetchAvatars function when restaurantIds change
        const refreshAvatars = useCallback(() => {
            setFetchedRestaurants(new Set());
            fetchAvatars();
        }, [fetchAvatars]);


        const contextValue = useMemo(() => ({
            reviews, avatars, fetchReviews, fetchAvatars, postReview,
            reviewPosted, resetReviewPosted, refreshAvatars
        }), [reviews, avatars, fetchReviews, fetchAvatars, postReview,
            reviewPosted, resetReviewPosted, refreshAvatars ]);


    return (
        <ReviewContext.Provider value={contextValue}>
            {children}
        </ReviewContext.Provider>
    )
}