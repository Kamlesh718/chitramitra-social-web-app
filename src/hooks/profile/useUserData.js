import { useUser } from "./useUser";

export function useUserData() {
  const { isLoading, user } = useUser();
  const profileImage = user?.user_metadata?.profile_image_url;
  const userId = user?.id;
  const email = user?.email;

  return { isLoading, profileImage, userId, email };
}
