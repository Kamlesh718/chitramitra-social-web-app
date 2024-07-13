import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages } from "../../services/apiChat";

export function useFetchMessages(currentUser, otherUser) {
  const queryClient = useQueryClient();
  const { data: getMessages, isLoading: isFetchingMessages } = useQuery({
    queryKey: ["messages", currentUser, otherUser],
    queryFn: () => fetchMessages(currentUser, otherUser),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", currentUser, otherUser]);
    },
  });

  return { getMessages, isFetchingMessages };
}
