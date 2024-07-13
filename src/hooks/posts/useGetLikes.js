import { useQuery } from "@tanstack/react-query";
import { useUserData } from "../profile/useUserData";
import { getLikes } from "../../services/apiPosts";

export function useGetLikes(postId) {
  const { userId } = useUserData();
  const {
    data: likes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["likes", postId],
    queryFn: () => getLikes({ userId, postId }),
  });

  return { likes, isLoading, error };
}
