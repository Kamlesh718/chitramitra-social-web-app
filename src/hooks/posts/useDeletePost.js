import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostAPI } from "../../services/apiPosts";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate: deletePost, isLoading: isDeletingPost } = useMutation({
    mutationFn: deletePostAPI,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["individualPosts"]);
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["followedPosts"]);
      }, 100);
    },
    onError: (err) => {
      alert("Failed to delete a post!!", err.message);
    },
  });
  return { deletePost, isDeletingPost };
}
