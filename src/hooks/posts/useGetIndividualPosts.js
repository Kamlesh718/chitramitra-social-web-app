import { useQuery } from "@tanstack/react-query";
import { getIndividualPosts as getIndividualPostsAPI } from "../../services/apiPosts";

export function useGetIndividualPosts(username) {
  const { data: getIndividualPosts, isLoading } = useQuery({
    queryKey: ["individualPosts", username],
    queryFn: () => getIndividualPostsAPI(username),
  });
  return { getIndividualPosts, isLoading };
}
