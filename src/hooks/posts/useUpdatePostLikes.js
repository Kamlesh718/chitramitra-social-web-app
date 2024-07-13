import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostLikes } from "../../services/apiPosts";

export function useUpdatePostLikes(postId) {
  const queryClient = useQueryClient();
  const { mutate: updatepostlike, isLoading } = useMutation({
    mutationFn: updatePostLikes,
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"], postId);
    },
  });

  return { updatepostlike, isLoading };
}
