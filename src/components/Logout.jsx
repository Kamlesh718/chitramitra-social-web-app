import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSignOut } from "../hooks/authentication/useSignOut";

function Logout() {
  const { signout, isLoading } = useSignOut();
  return (
    <Link to="/" className="hover:text-gray-300 flex gap-2 ">
      <ArrowRightEndOnRectangleIcon className="size-8" />
      <span className="text-xl font-semibold" onClick={signout}>
        {isLoading ? "...Logging out" : "Logout"}
      </span>
    </Link>
  );
}

export default Logout;
