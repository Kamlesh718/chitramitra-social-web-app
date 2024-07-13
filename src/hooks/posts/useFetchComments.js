import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../../services/apiPosts";

export function useFetchComments(postId) {
  const { data: getComments, isLoading: isFetchingComments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    onError: () => {
      console.log("Failed to fetch comments");
    },
  });
  return { getComments, isFetchingComments };
}
