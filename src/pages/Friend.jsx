import { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { useFriends } from '../context/FriendContext';
import { Searchbar, FriendCard, FriendList } from '../components';
import { useNavigate } from 'react-router-dom';

export const Friend = () => {
  const { clearSearchbar } = useLocation();
  const { accessToken, setInRegistrationFlow, inRegistrationFlow} = useAuth();
  const { fetchFriends, fetchFriendDetails, friend, setFriend } = useFriends();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // fetch friends on mount if we have an access token
  useEffect(() => {
    if (accessToken) {
      fetchFriends();
    }
  }, [fetchFriends, accessToken]);

  // fetch friend details when the username changes
  useEffect(() => {
    if (username) {
      fetchFriendDetails(username);
    }
  }, [username, fetchFriendDetails]);

  // Set the username as the searched username
  const handleSearch = (searchedUsername) => {
    setUsername(searchedUsername);
  };

  // Navigate to home and set the registration flow to false
  const navigateToHome = () => {
    setInRegistrationFlow(false);
    navigate('/home');
  };

  const clearFriend = () => {
    setUsername('');
    setFriend(null);
    clearSearchbar();
  }

  return (
    <div className="flex justify-center h-screen mt-28 mx-4 md:mx-0">
      <div className="flex flex-col items-center w-full max-w-md space-y-5">
      {inRegistrationFlow && ( // only show the header if we are in the registration flow
          <>
            <h1 className="text-5xl my-3 font-luckiest text-center text-darkGreen">Friends Feed</h1>
            <p className="text-center">
              Add friends so you can start seeing reviews right away.
              This is what makes Friends Feed so great!
            </p>
          </>
        )}
        <div className="w-full">
          <Searchbar onSearch={handleSearch} placeholder="Search @Username" />
        </div>
        {friend &&
          <FriendCard
            key={friend.id}
            username={friend.username}
            profile_picture={friend.profile_picture}
            following={friend.following}
            onFollowChange={() => clearFriend()}
            className="w-full"
            />
        }
        <h2 className="w-full">Your Friends will appear here.</h2>
        <FriendList />
        {inRegistrationFlow && ( // only show the continue button and skip now if we are in the registration flow
          <div className=" md:mx-0 mx-4 w-full">
            <button
            className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10 w-full"
            onClick={navigateToHome}
          >
            Continue
          </button>
            <p className="text-center font-bold mt-3" onClick={navigateToHome}>Skip for now</p>
          </div>
        )}
    </div>
    </div>
  )
}
