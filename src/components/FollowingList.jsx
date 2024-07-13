import { Link } from "react-router-dom";

import { useFetchFollowing } from "../hooks/follow/useFetchFollowing";
import SmallLoader from "../components/SmallLoader";
import NoFriendsNoChat from "./NoFriendsNoChat";

function FollowingList({ route }) {
  const { getFollowing, isFetchingFollowing } = useFetchFollowing();

  if (isFetchingFollowing) return <SmallLoader />;

  return (
    <ul>
      {getFollowing?.length === 0 ? (
        <NoFriendsNoChat />
      ) : (
        getFollowing?.map((user) => (
          <li key={user.id}>
            <Link to={`${route}/${user.followed_username}`}>
              <div className="flex items-center mb-4 gap-2 p-2 border border-[#0000] border-b-[#1abc9c] ">
                <img
                  src={user.followed_avatar}
                  alt={`${user.followed_username}'s avatar`}
                  className="w-12 h-12 rounded-full mr-2"
                />

                <span className="font-semibold text-xl">
                  {user.followed_username}
                </span>
              </div>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}

export default FollowingList;
