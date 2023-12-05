import React, { createContext, useState, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useReview } from './ReviewContext';
import { useRestaurant } from './RestaurantContext';


export const FriendContext = createContext();

export const useFriends = () => {
    return useContext(FriendContext);
};

export const FriendProvider = ({ children }) => {
    const [friends, setFriends] = useState([]); // used for friendlist
    const [friend, setFriend] = useState(null); // used for friend details
    const { accessToken } = useAuth();
    const { refreshAvatars } = useReview();
    const { fetchFriendReviewedRestaurants } = useRestaurant();

    const fetchFriendDetails = useCallback(async (username) => {
        try {
            const response = await fetch(
                `https://colab-test.onrender.com/find-friend/${username}`,
                {
                    method: "GET",
                    headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    },
                }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFriend(data)
        } catch (error) {
            console.error('There was a problem fetching friend details:', error);
        }
    }, [accessToken]);

    const fetchFriends = useCallback(async () => {
        try {
            const response = await fetch('https://colab-test.onrender.com/friends', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json()
            console.log("Freched Friends data: ", data)
            setFriends(data)
        } catch (error) {
            console.error('There was a problem fetching friends:', error);
        }
    }, [accessToken]);

    const followFriend = async (username) => {
        try {
            const response = await fetch('https://colab-test.onrender.com/follow-friend', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friend_username: username }),
            })

            const data = await response.json();

            if (!response.ok) {
                console.error('Error following friend:', data);
                throw new Error(data.message || 'Error following friend');
            }

            await fetchFriends(accessToken);
            await fetchFriendReviewedRestaurants();
            await refreshAvatars();
        } catch (error) {
            console.error('Error following friend:', error);
        }

    }

    const unfollowFriend = async (username) => {
        try {
            const response = await fetch('https://colab-test.onrender.com/remove-friend', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friend_username: username }),
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error unfollowing friend');
            }

            await fetchFriends(accessToken);
            await fetchFriendReviewedRestaurants();
            await refreshAvatars();
        } catch (error) {
            console.error('Error unfollowing friend:', error);
        }

    }

    const updateFriends = (newFriends) => {
        setFriends(newFriends)
    }

    const contextValue = {
        friends,
        fetchFriends,
        updateFriends,
        followFriend,
        unfollowFriend,
        friend,
        setFriend,
        fetchFriendDetails
    }
    return (
        <FriendContext.Provider value={contextValue}>
            {children}
        </FriendContext.Provider>
    )
}