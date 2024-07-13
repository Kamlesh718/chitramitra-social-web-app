import { useQuery } from "@tanstack/react-query";
import { fetchFollowing } from "../../services/apiFollow";
import { useUsername } from "../profile/useUsername";

export function useFetchFollowing() {
  const { username } = useUsername();
  const { data: getFollowing, isLoading: isFetchingFollowing } = useQuery({
    queryKey: ["following", username?.username],
    queryFn: () => fetchFollowing(username?.username),
  });

  return { getFollowing, isFetchingFollowing };
}
