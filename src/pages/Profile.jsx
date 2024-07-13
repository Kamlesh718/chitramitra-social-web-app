import { Outlet } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import { useUsername } from "../hooks/profile/useUsername";
import { useUserData } from "../hooks/profile/useUserData";
import { useFetchFollowing } from "../hooks/follow/useFetchFollowing";

import Logout from "../components/Logout";
import { useGetIndividualPosts } from "../hooks/posts/useGetIndividualPosts";

function Profile() {
  const { getFollowing } = useFetchFollowing();
  // const { getFollowers } = useFetchFollowers(followedUsername);
  const followingLength = getFollowing?.length;
  // const followersLength = getFollowers?.length;
  const { profileImage } = useUserData();
  const { username, isLoading } = useUsername();
  const name = username?.username;
  const fullname = username?.fullname;
  const bio = username?.bio;
  const { getIndividualPosts } = useGetIndividualPosts(name);
  const postLength = getIndividualPosts?.length;

  return (
    <div>
      <div className="lg:hidden">
        <Logout />
      </div>
      <ProfileHeader
        isLoading={isLoading}
        username={name}
        fullname={fullname}
        bio={bio}
        profileImageUrl={profileImage}
      />
      <ProfileStats
        // followers={followersLength}
        following={followingLength}
        posts={postLength}
      />
      <Outlet />
    </div>
  );
}

export default Profile;
