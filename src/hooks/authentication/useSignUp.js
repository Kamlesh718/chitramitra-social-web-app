import { useMutation } from "@tanstack/react-query";
import { signup as signUpAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpAPI,
    onSuccess: () => {
      alert("Thank you for registering!");
    },
    onError: () => {
      navigate("/register");
    },
  });

  return { signup, isLoading };
}
