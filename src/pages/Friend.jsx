import { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import { useFriends } from '../context/FriendContext';
import { Searchbar, FriendCard, FriendList } from '../components';
import { Link, useNavigate } from 'react-router-dom';

export const Friend = () => {
  const { accessToken, setInRegistrationFlow, inRegistrationFlow} = useAuth();
  const { fetchFriends, fetchFriendDetails, setFriends, friend, setFriend } = useFriends();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      fetchFriends();
    }
  }, [fetchFriends, accessToken]);

  useEffect(() => {
    if (username) {
      fetchFriendDetails(username);
    }
  }, [username, fetchFriendDetails]);

  const handleSearch = (searchedUsername) => {
    setUsername(searchedUsername);
  };

  const navigateToHome = () => {
    setInRegistrationFlow(false);
    navigate('/home');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center w-full max-w-md space-y-5">
      {inRegistrationFlow && (
          <>
            <h1 className="text-5xl my-3 font-luckiest text-center text-darkGreen">Friends Feed</h1>
            <p className="text-center">
              Add friends so you can start seeing reviews right away.
              This is what makes Friends Feed so great!
            </p>
          </>
        )}
        <div className="w-full">
          <Searchbar handleSearch={handleSearch} placeholder="Search @Username" />
        </div>
        <h2 className="w-full">Your Friends will appear here.</h2>
        {friend &&
          <FriendCard
            key={item.id}
            username={item.username}
            profile_picture={item.profile_picture}
            following={item.following}
            onFollowChange={() => setFriend(null)}
            className="w-full"
            />
        }
        <FriendList />
        {inRegistrationFlow && (
          <div>
            <button
            className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10 w-96"
            onClick={navigateToHome}
          >
            Continue
          </button>
          <Link to="/home">
            <p className="text-center font-bold mt-3">Skip for now</p>
            </Link>
          </div>
        )}
    </div>
    </div>
  )
}
