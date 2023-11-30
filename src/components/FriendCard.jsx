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
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <img
                    src={avatarImage}
                    alt="user avatar"
                    className="w-12 h-12 rounded-full"
                />
                <p className="text-xl">@{username}</p>
            </div>
            <button
                onClick={handleButtonPress}
                className="px-4 py-2 bg-primaryGreen text-white rounded-md hover:bg-secondaryGreen "
            >
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
      )

}
