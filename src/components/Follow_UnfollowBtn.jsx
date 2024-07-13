import { useUserData } from "../hooks/profile/useUserData";
import SmallLoader from "./SmallLoader";

function Follow_UnfollowBtn({
  getStatus,
  username,
  followUser,
  unfollowUser,
  user,
  isFetchingStatus,
}) {
  const { userId } = useUserData();

  const handleFollow = function (
    followed_id,
    followed_username,
    followed_avatar
  ) {
    const formData = {
      followed_id,
      follower_id: userId,
      follower_username: username.username,
      followed_username,
      followed_avatar,
    };
    try {
      followUser(formData);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = (followed_id, followed_username) => {
    try {
      unfollowUser({
        followed_id,
        follower_id: userId,
        follower_username: username.username,
        followed_username,
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
  return (
    <>
      {getStatus?.status ? (
        <button
          className="px-4 py-1 rounded mt-2 w-full bg-gray-500 hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg"
          onClick={() => handleUnfollow(user.id, user.username)}
        >
          {isFetchingStatus ? <SmallLoader /> : "Unfollow"}
        </button>
      ) : (
        <button
          className="px-4 py-1 rounded mt-2 w-full bg-[#1abc9c] hover:bg-[#16a085] transition-colors shadow-md hover:shadow-lg"
          onClick={() => handleFollow(user.id, user.username, user.avatar)}
        >
          {isFetchingStatus ? <SmallLoader /> : "Follow"}
        </button>
      )}
    </>
  );
}

export default Follow_UnfollowBtn;
