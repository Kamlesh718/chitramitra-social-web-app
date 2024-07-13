import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileImage } from "../../services/apiAuth";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const { mutate: updateAvatar, isLoading } = useMutation({
    mutationFn: ({ id, avatar, oldAvatar }) =>
      updateProfileImage({ id, avatar, oldAvatar }),
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
    },
  });

  return { updateAvatar, isLoading };
}
