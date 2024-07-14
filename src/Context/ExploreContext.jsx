// src/context/ExploreContext.js

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUsers } from "../services/apiFollow";
import { useUsername } from "../hooks/profile/useUsername";
import { useFollowUser } from "../hooks/follow/useFollowUser";
import { useUnfollowUser } from "../hooks/profile/useUnfollowUser";
import { useFetchStatus } from "../hooks/follow/useFetchStatus";
import { useFetchPosts } from "../hooks/posts/useFetchPosts";
import { useUserData } from "../hooks/profile/useUserData";

const ExploreContext = createContext();

function ExploreProvider({ children }) {
  const { getPosts, isFetchingPosts } = useFetchPosts();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const { userId } = useUserData();
  const { username } = useUsername();
  const { followUser } = useFollowUser();
  const { unfollowUser } = useUnfollowUser();
  const { getStatus, isFetchingStatus } = useFetchStatus(uniqueId);

  useEffect(() => {
    const followed_id = searchResults?.map((u) => u.id);

    const unique_id = `-${userId}**${followed_id}-`;

    setUniqueId(unique_id);
  }, [searchResults, userId]);

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    const fetchSearchResults = async () => {
      if (search.length > 2) {
        setIsFetching(true);
        try {
          const results = await fetchUsers(search);
          if (!isCancelled) {
            setSearchResults(results);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          if (!isCancelled) {
            setIsFetching(false);
          }
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [search]);

  return (
    <ExploreContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        isFetching,
        uniqueId,
        username,
        followUser,
        unfollowUser,
        getStatus,
        isFetchingStatus,
        getPosts,
        isFetchingPosts,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
}

function useExplore() {
  const context = useContext(ExploreContext);
  if (context === undefined)
    throw new Error("Context used outside of the provider");
  return context;
}
export { ExploreProvider, useExplore };
