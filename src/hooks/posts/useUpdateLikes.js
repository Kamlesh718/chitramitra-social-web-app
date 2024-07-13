import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLikes } from "../../services/apiPosts";

export function useUpdateLikes(postId) {
  const queryClient = useQueryClient();
  const { mutate: updateLike, isLoading } = useMutation({
    mutationFn: updateLikes,
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"], postId);
    },
    onError: (err) => {
      alert("Failed to update like!!", err.message);
    },
  });

  return { updateLike, isLoading };
}
