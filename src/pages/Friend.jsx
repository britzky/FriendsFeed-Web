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
    <div>
        <h1 className="text-5xl my-3 font-luckiest text-center text-darkGreen">Friends Feed</h1>
        <p>
          Add friends so you can start seeing reviews right away.
          This is what makes Friends Feed so great!
        </p>
        <Searchbar handleSearch={handleSearch} placeholder="Search @Username" />
        <h2>Your Friends will appear here</h2>
        {friend && (
          <div>
            {friend.map((item) => (
              <FriendCard
                key={item.id}
                username={item.username}
                profile_picture={item.profile_picture}
                following={item.following}
                onFollowChange={() => setFriend(null)}
              />
            ))}
          </div>
        )}
        <FriendList />
        {inRegistrationFlow && (
          <div>
            <button
            className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen mt-10 w-96"
            onClick={navigateToHome}
          >
            Continue
          </button>
          <Link to="/home">Skip for now</Link>
          </div>
        )}
    </div>
  )
}
