import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentAPI } from "../../services/apiPosts";

export function useDeleteComment(postId) {
  const queryClient = useQueryClient();
  const { mutate: deleteComment, isLoading: isDeletingComment } = useMutation({
    mutationFn: deleteCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (err) => {
      alert("Failed to delete a comment", err.message);
    },
  });
  return { deleteComment, isDeletingComment };
}
