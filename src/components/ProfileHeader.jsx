import { Link } from "react-router-dom";
import SmallLoader from "./SmallLoader";

function ProfileHeader({
  username,
  bio,
  profileImageUrl,
  fullname,
  isLoading,
}) {
  return (
    <div className="p-4 ">
      {isLoading ? (
        <div className="flex items-center">
          <SmallLoader />
        </div>
      ) : (
        <div className="flex items-center ">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="mt-2 w-32 h-32 object-cover rounded-full border-2 border-[#1abc9c]  mr-4"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">{username}</h2>
            <p className="font-semibold text-sm md:text-lg">
              {!bio ? "Your bio" : bio}
            </p>
            <p className="font-semibold text-sm md:text-lg">{fullname}</p>
            <Link
              to="editprofile"
              className="px-4 py-1 rounded mt-2 w-full bg-[#1abc9c]"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
