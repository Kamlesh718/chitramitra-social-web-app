import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import SmallLoader from "../components/SmallLoader";
import { useUpdateAvatar } from "../hooks/profile/useUpdateAvatar";
import { useUpdateBio } from "../hooks/profile/useUpdateBio";
import { useUpdateUsername } from "../hooks/profile/useUpdateUsername";
import { useUsername } from "../hooks/profile/useUsername";
import { useUserData } from "../hooks/profile/useUserData";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdatePassword } from "../hooks/profile/useUpdatePassword";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

function EditProfile() {
  const { userId, email, profileImage } = useUserData();
  const { username, isLoading } = useUsername();
  const [usernameProfile, setUsername] = useState("");
  const [avatar, setAvatar] = useState(<SmallLoader />);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser, isLoading: isUsernameUpdating } = useUpdateUsername();
  const { updateUserBio, isLoading: isBioUpdating } = useUpdateBio();
  const { updateAvatar, isLoading: isAvatarUpdating } = useUpdateAvatar();
  const { updatePassword, isUpdatingPassword } = useUpdatePassword();
  const queryClient = useQueryClient();

  const handlePasswordVisibility = function () {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (username) {
      setUsername(username?.username);
      setBio(username?.bio);
      setAvatar(profileImage);
    }
  }, [username, profileImage]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    const formData = { id: userId, username: usernameProfile };
    updateUser(formData);
  };

  const handleBioSubmit = (e) => {
    e.preventDefault();
    const formData = { id: userId, bio };
    if (bio.trim() !== "") {
      updateUserBio(formData);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.trim() !== "") {
      updatePassword(password);
    }
  };

  const handleAvatarSubmit = (e) => {
    const oldAvatar = profileImage.split("/").at(-1);
    e.preventDefault();
    const formData = {
      id: userId,
      avatar,
      oldAvatar,
    };
    setTimeout(() => {
      queryClient.refetchQueries(["user"]);
    }, 1500);
    updateAvatar(formData);
  };

  return (
    <div className="p-4 rounded-lg max-w-md mx-auto mt-8 mb-12">
      <Heading>Edit Profile</Heading>
      {isLoading ? (
        <SmallLoader />
      ) : (
        <>
          <form onSubmit={handleAvatarSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="profileImage">
                Profile Image (If not updated refresh the page)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="block w-full text-sm text-[#1abc9c]
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-100 file:text-[#1abc9c]
                  font-semibold cursor-pointer"
              />
              {avatar && (
                <img
                  src={avatar}
                  alt="Profile"
                  className="mt-2 w-32 h-32 object-cover rounded-full"
                />
              )}
            </div>
            <input
              type="submit"
              value="Update Profile Image"
              className="bg-[#1abc9c] py-2 px-3 rounded-md"
              disabled={isLoading || isAvatarUpdating}
            />
          </form>

          <form className="mb-4">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="username">
                Email
              </label>
              <input
                value={email}
                className="border border-gray-500 w-full h-12 px-3 py-2 rounded-md cursor-not-allowed"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="fullname">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                value={username?.fullname}
                className="border border-gray-500 w-full h-12 px-3 py-2 rounded-md cursor-not-allowed"
                disabled
              />
            </div>
          </form>

          <form onSubmit={handleUsernameSubmit} className="mb-4">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={usernameProfile}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-500 w-full h-12 px-3 py-2 rounded-md text-gray-700"
                disabled={isLoading || isUsernameUpdating}
              />
            </div>
            <input
              type="submit"
              value={isUsernameUpdating ? "Updating..." : "Update Username"}
              className=" bg-[#1abc9c] py-2 px-3 rounded-md"
              disabled={isLoading || isUsernameUpdating}
            />
          </form>

          <form onSubmit={handleBioSubmit} className="mb-4">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                className="border border-gray-500 w-full h-12 px-3 py-2 rounded-md text-gray-700"
                disabled={isLoading || isBioUpdating}
              ></textarea>
            </div>
            <input
              type="submit"
              value={isBioUpdating ? "Updating..." : "Update Bio"}
              className=" bg-[#1abc9c] py-2 px-3 rounded-md"
              disabled={isLoading || isBioUpdating}
            />
          </form>
          <form onSubmit={handlePasswordSubmit} className="mb-4">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="bio">
                Password
              </label>
              <input
                id="password"
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="password (8-chars)"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-500 w-full h-12 px-3 py-2 rounded-md text-gray-700"
                disabled={isLoading || isUpdatingPassword}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-block" onClick={handlePasswordVisibility}>
                {showPassword ? (
                  <EyeSlashIcon className="size-8" />
                ) : (
                  <EyeIcon className="size-8" />
                )}
              </span>
              <input
                type="submit"
                value={isUpdatingPassword ? "Updating..." : "Update Password"}
                className="sm:w-1/3 bg-[#1abc9c] py-2 px-3 rounded-md"
                disabled={isLoading || isUpdatingPassword}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default EditProfile;
