import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout as signoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signout, isLoading } = useMutation({
    mutationFn: signoutAPI,
    onSuccess: () => {
      queryClient.removeQueries();
      alert("Logged out");
      navigate("/login", { replace: true });
    },
  });

  return { signout, isLoading };
}
