import { useQuery } from "@tanstack/react-query";
import { getUsername } from "../../services/apiAuth";
import { useUserData } from "./useUserData";

export function useUsername() {
  const { userId, email } = useUserData();
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["username", email],
    queryFn: () => getUsername(userId),
  });
  const username = profiles && profiles.length > 0 ? profiles[0] : null;
  // console.log("username:", username); // Debugging username
  // console.log("isLoading:", isLoading); // Debugging isLoading
  // console.log("error:", error); // Debugging error
  return { username, isLoading };
}
