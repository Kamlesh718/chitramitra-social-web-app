import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPosts as addPostsAPI } from "../../services/apiPosts";

export function useAddPost() {
  const queryClient = useQueryClient();
  const { mutate: addPosts, isLoading: isAddingPost } = useMutation({
    mutationFn: addPostsAPI,
    onSuccess: () => {
      alert("Post added");
      setTimeout(() => {
        queryClient.invalidateQueries(["posts"]);
      }, 1000);
    },
    onError: (err) => {
      alert("Failed to post!!", err.message);
    },
  });

  return { addPosts, isAddingPost };
}
