import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts as getPostsAPI } from "../../services/apiPosts";

export function useFetchPosts() {
  const queryClient = useQueryClient();
  const { data: getPosts, isLoading: isFetchingPosts } = useQuery({
    queryFn: getPostsAPI,
    queryKey: ["posts"],
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["posts"]);
      }, 1500);
    },
  });

  return { getPosts, isFetchingPosts };
}
