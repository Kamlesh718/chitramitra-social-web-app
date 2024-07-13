import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signin, isLoading } = useMutation({
    mutationFn: signinAPI,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      alert("Welcome to ChitraMitra!! 🎊 ");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      alert(err.message, "Provided email or password is incorrect");
    },
  });

  return { signin, isLoading };
}
