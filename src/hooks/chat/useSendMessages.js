import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageAPI } from "../../services/apiChat";

export function useSendMessages() {
  const queryClient = useQueryClient();
  const { mutate: sendMessage, isLoading: isSendingMessage } = useMutation({
    mutationFn: sendMessageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
  return { sendMessage, isSendingMessage };
}
