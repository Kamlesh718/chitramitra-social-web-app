import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComments } from "../../services/apiPosts";

export function useAddComments(postId) {
  const queryClient = useQueryClient();
  const { mutate: addComment, isLoading: isAddingComment } = useMutation({
    mutationFn: addComments,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"], postId);
    },
    onError: () => {
      alert("Failed to add comment");
    },
  });
  return { addComment, isAddingComment };
}
