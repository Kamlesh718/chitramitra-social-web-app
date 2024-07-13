import { useQuery } from "@tanstack/react-query";
import { fetchFollowers } from "../../services/apiFollow";

export function useFetchFollowers(followed_username) {
  const { data: getFollowers, isLoading: isFetchingFollowers } = useQuery({
    queryKey: ["follower", followed_username],
    queryFn: () => fetchFollowers(followed_username),
  });

  return { getFollowers, isFetchingFollowers };
}
