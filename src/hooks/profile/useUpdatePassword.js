import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordAPI } from "../../services/apiAuth";

export function useUpdatePassword() {
  const { mutate: updatePassword, isLoading: isUpdatingPassword } = useMutation(
    {
      mutationFn: updatePasswordAPI,
      onSuccess: () => {
        alert("Password Updated");
      },
      onError: (err) => {
        alert(err.message);
      },
    }
  );
  return { updatePassword, isUpdatingPassword };
}
