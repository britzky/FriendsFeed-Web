import { useFriends } from "../context/FriendContext"
import { useAuth } from "../context/AuthContext"
import { avatars } from "../assets/avatars"

export const FriendCard = ({ username, profile_picture, following, onFollowChange}) => {
    const { followFriend, unfollowFriend } = useFriends();

    // get the avatar image based on the profile picture
    const avatarImage = avatars[profile_picture]

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
            <button onClick={handleButtonPress}>
                {following ? "Unfollow" : "Follow"}
            </button>
    </div>
  )
}
