import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostImage } from "../../services/apiPosts";

export function useUpdatePostImage() {
  const queryClient = useQueryClient();
  const { mutate: updateImage, isLoading: isUpdatingImage } = useMutation({
    mutationFn: updatePostImage,
    onSuccess: () => {
      alert("Post image updated");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      alert("Failed to update postImage!!", err.message);
    },
  });
  return { updateImage, isUpdatingImage };
}
