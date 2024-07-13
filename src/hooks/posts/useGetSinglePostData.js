import { useQuery } from "@tanstack/react-query";
import { getSinglePostData as getSinglePostDataAPI } from "../../services/apiPosts";

export function useGetSinglePostData(postid) {
  const { data: getSinglePostData, isLoading } = useQuery({
    queryKey: ["singlePostData", postid],
    queryFn: () => getSinglePostDataAPI(postid),
  });
  return { getSinglePostData, isLoading };
}
