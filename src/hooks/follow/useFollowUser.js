import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser as insertFollowUser } from "../../services/apiFollow";

export function useFollowUser() {
  const queryClient = useQueryClient();
  const { mutate: followUser, isLoading: isFollowing } = useMutation({
    mutationFn: insertFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["following"]);
      queryClient.invalidateQueries(["follow-status"]);
    },
  });
  return { followUser, isFollowing };
}
