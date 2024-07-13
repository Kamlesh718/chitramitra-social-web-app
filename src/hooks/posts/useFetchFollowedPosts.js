import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFollowedPosts as getFollowedPostsAPI } from "../../services/apiPosts";
import { useUserData } from "../profile/useUserData";

export function useFetchFollowedPosts() {
  const { userId } = useUserData();
  const queryClient = useQueryClient();

  const { data: getFollowedPosts, isLoading: isFetchingFollowedPosts } =
    useQuery({
      queryFn: () => getFollowedPostsAPI(userId),
      queryKey: ["followedPosts"],
      onSuccess: () => {
        setTimeout(() => {
          queryClient.refetchQueries(["followedPosts"]);
        }, 1500);
      },
    });
  return { getFollowedPosts, isFetchingFollowedPosts };
}
