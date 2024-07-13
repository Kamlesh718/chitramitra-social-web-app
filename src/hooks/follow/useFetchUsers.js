import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers as fetchUsersAPI } from "../../services/apiFollow";

export function useFetchUsers(search) {
  const queryClient = useQueryClient();
  const { data: fetchUsers, isLoading: isFetchingUsers } = useQuery({
    queryKey: ["searched_users", search],
    queryFn: () => fetchUsersAPI(search),
    onSuccess: (data) => {
      queryClient.setQueryData(["searched_users", search], data);
    },
  });

  return { fetchUsers, isFetchingUsers };
}
