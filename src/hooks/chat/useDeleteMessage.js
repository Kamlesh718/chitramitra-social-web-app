import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage as deleteMessageAPI } from "../../services/apiChat";

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  const { mutate: deleteMessage, isLoading: isDeletingMessage } = useMutation({
    mutationFn: deleteMessageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
    onError: (err) => {
      alert("Failed to delete a message!!", err.message);
    },
  });
  return { deleteMessage, isDeletingMessage };
}
