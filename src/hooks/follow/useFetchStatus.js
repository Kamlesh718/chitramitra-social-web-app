import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStatus } from "../../services/apiFollow";

export function useFetchStatus(unique_id) {
  const queryClient = useQueryClient();
  const { data: getStatus, isLoading: isFetchingStatus } = useQuery({
    queryKey: ["follow-status", unique_id],
    queryFn: () => fetchStatus(unique_id),
    onSuccess: () => {},
    onError: () => {
      queryClient.setQueryData(["follow-status", unique_id]);
    },
  });

  return { getStatus, isFetchingStatus };
}
