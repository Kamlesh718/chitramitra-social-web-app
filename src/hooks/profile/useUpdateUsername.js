import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUsername } from "../../services/apiAuth";

export function useUpdateUsername() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ id, username }) => updateUsername({ id, username }),
    onSuccess: () => {
      queryClient.invalidateQueries(["username"]);
    },
    onError: (err) => {
      alert("Failed to update username!!", err.message);
    },
  });

  return { updateUser, isLoading };
}
