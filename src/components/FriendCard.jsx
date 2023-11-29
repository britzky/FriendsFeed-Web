import { useFriends } from "../context/FriendContext"
import { useAuth } from "../context/AuthContext"
import { avatars } from "../assets/avatars"

export const FriendCard = ({ username, profile_picture, following, onFollowChange}) => {
    const { followFriend, unfollowFriend } = useFriends();
    const { userDetails } = useAuth();

    // get the avatar image based on the profile picture
    const avatarImage = avatars[profile_picture]

    //check if userDetails is not null before accessing username
    const isCurrentUser = userDetails && username == userDetails.username;

    // change the button based on weather the user is following the friend or not
    const handleButtonPress = () => {
        if (following) {
            unfollowFriend(username)
        } else {
            followFriend(username)
        }
        onFollowChange()
    }

  return (
    <div>
        <img src={avatarImage} alt="user avatar" />
        <p>{username}</p>
        {!isCurrentUser && (
            <button onClick={handleButtonPress}>
                {following ? "Unfollow" : "Follow"}
            </button>
        )}
    </div>
  )
}
