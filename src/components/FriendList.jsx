import { FriendCard } from "./FriendCard"
import { useFriends } from "../context/FriendContext"

export const FriendList = () => {
  const { friends } = useFriends();
  
  return (
    <div className="w-full space-y-3">
      {friends.map((item) => (
        <FriendCard
          key={item.id}
          username={item.username}
          profile_picture={item.profile_picture}
          following={item.following}
          onFollowChange={() => {}}
        />
      ))}
    </div>
  )
}
