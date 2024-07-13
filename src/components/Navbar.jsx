import { NavLink, Link } from "react-router-dom";
import {
  ChatBubbleLeftIcon,
  PlusCircleIcon,
  GlobeAsiaAustraliaIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/4.png";
import ToggleTheme from "./ToggleTheme";
import Logout from "./Logout";
import SmallLoader from "./SmallLoader";
import { useUserData } from "../hooks/profile/useUserData";
import { useUsername } from "../hooks/profile/useUsername";

function Navbar() {
  const { profileImage, isLoading } = useUserData();
  const { username, isLoading: usernameLoading } = useUsername();

  return (
    <>
      {/* Sidebar for tablet and above */}
      <header className="hidden lg:flex flex-col fixed top-0 left-0 h-full p-4   shadow-lg">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <img
            src={Logo}
            alt="ChitraMitra Logo"
            className="rounded-full mb-6 w-20 h-20  border-2 border-orange-500"
          />
          <span>ChitraMitra</span>
        </Link>

        <nav>
          <ul className="flex flex-col gap-6 text-lg font-medium">
            <li>
              <NavLink to="/" className="hover:text-gray-300 flex gap-2 ">
                <HomeIcon className="size-8" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore" className="hover:text-gray-300 flex gap-2">
                <GlobeAsiaAustraliaIcon className="size-8" />
                <span>Explore</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/createpost"
                className="hover:text-gray-300 flex gap-2"
              >
                <PlusCircleIcon className="size-8" />
                <span>CreatePost</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/message" className="hover:text-gray-300 flex gap-2">
                <ChatBubbleLeftIcon className="size-8" />
                <span>Message</span>
              </NavLink>
            </li>

            <li>
              <ToggleTheme />
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <Logout />
          <NavLink
            to="/profile"
            className="hover:text-gray-300 flex items-center gap-2"
          >
            {isLoading ? (
              <SmallLoader />
            ) : (
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-full w-12 h-12 border-2 border-rose-500 "
              />
            )}
            <span className="text-xl font-semibold ">
              {usernameLoading ? <SmallLoader /> : username.username}
            </span>
          </NavLink>
        </div>
      </header>

      {/* Bottom navigation bar for mobile screens */}
      <header className="lg:hidden fixed bottom-0 w-full p-2  shadow-md">
        <nav className="relative">
          <ul className="flex justify-around text-m font-medium px-4">
            <li className="relative">
              <NavLink to="/" className="hover:text-gray-300">
                <HomeIcon className="w-8 h-8" />
              </NavLink>
            </li>
            <li className="relative">
              <NavLink to="/explore" className="hover:text-gray-300">
                <GlobeAsiaAustraliaIcon className="w-8 h-8" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/createpost" className="hover:text-gray-300">
                <PlusCircleIcon className="w-8 h-8" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/message" className="hover:text-gray-300">
                <ChatBubbleLeftIcon className="w-8 h-8" />
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" className="hover:text-gray-300">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="rounded-full w-8 h-8"
                />
              </NavLink>
            </li>
          </ul>
          <span className="absolute top-[-60px] right-0 px-1">
            <ToggleTheme />
          </span>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
