import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowUser as deleteFollowUser } from "../../services/apiFollow";

export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { mutate: unfollowUser, isLoading: isUnfollowing } = useMutation({
    mutationFn: deleteFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["following"]);
      queryClient.invalidateQueries(["follow-status"]);
    },
  });
  return { unfollowUser, isUnfollowing };
}
