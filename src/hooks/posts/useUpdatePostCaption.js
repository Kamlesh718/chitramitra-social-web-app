import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostCaption } from "../../services/apiPosts";

export function useUpdatePostCaption() {
  const queryClient = useQueryClient();
  const { mutate: updateCaption, isLoading: isUpdatingCaption } = useMutation({
    mutationFn: updatePostCaption,
    onSuccess: () => {
      alert("Post Caption updated");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      alert("Failed to update post!!", err.message);
    },
  });
  return { updateCaption, isUpdatingCaption };
}
