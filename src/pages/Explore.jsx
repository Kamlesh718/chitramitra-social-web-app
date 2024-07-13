import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import { fetchUsers } from "../services/apiFollow";
import Follow_UnfollowBtn from "../components/Follow_UnfollowBtn";
import { useExplore } from "../Context/ExploreContext";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import NoPosts from "../components/NoPost";

function Explore() {
  const {
    search,
    setSearch,
    searchResults,
    isFetching,
    username,
    followUser,
    unfollowUser,
    getStatus,
    isFetchingStatus,
    getPosts,
    isFetchingPosts,
  } = useExplore();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries(["posts"]);
  }, [queryClient]);
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      {fetchUsers?.length > 0 && (
        <div className="mt-1 w-full  shadow-lg rounded-lg ">
          <ul>
            {isFetching
              ? "Searching...."
              : searchResults?.map((user) => (
                  <li
                    key={user.id}
                    className="p-3 border-b rounded-md flex gap-4 items-center shadow-sm text-sm md:text-lg shadow-[#1abc9c] border-2 mb-2 border-[#1abc9c] "
                  >
                    {user.username === username.username ? (
                      "Bro are you finding yourself ?"
                    ) : (
                      <>
                        <img
                          src={user.avatar}
                          alt={`${user.username}'s avatar`}
                          className="w-18 h-24 rounded-full border-4 border-[#1abc9c] transition-transform transform hover:scale-105 avatar-container"
                        />
                        <div className="flex flex-col gap-1">
                          <h2 className="">{user.username}</h2>
                          <p>
                            <strong>{user.bio}</strong>
                          </p>
                          <Follow_UnfollowBtn
                            getStatus={getStatus}
                            username={username}
                            followUser={followUser}
                            unfollowUser={unfollowUser}
                            user={user}
                            isFetchingStatus={isFetchingStatus}
                          />
                        </div>
                      </>
                    )}
                  </li>
                ))}
          </ul>
        </div>
      )}

      {
        <div
          className={`mb-12 mt-2 ${
            getPosts?.length > 0
              ? "grid grid-cols-1  place-items-center sm:grid-cols-2 gap-2  grid-rows-min grid-flow-dense"
              : "flex justify-center"
          }  `}
        >
          {getPosts?.length === 0 ? (
            <NoPosts />
          ) : (
            getPosts?.map((post) => (
              <Post
                key={post.id}
                post={post}
                isFetchingPosts={isFetchingPosts}
              />
            ))
          )}
        </div>
      }
    </>
  );
}

export default Explore;
