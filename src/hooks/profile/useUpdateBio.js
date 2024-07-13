import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBio } from "../../services/apiAuth";

export function useUpdateBio() {
  const queryClient = useQueryClient();
  const { mutate: updateUserBio, isLoading } = useMutation({
    mutationFn: ({ id, bio }) => updateBio({ id, bio }),
    onSuccess: () => {
      queryClient.invalidateQueries(["username"]);
    },
    onError: (err) => {
      alert("Failed to update bio!!", err.message);
    },
  });

  return { updateUserBio, isLoading };
}
