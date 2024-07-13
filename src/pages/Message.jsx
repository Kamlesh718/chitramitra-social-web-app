import { Link } from "react-router-dom";
import ChatList from "../components/ChatList";

function Message() {
  return (
    <div className="">
      <Link
        to="/notifications"
        className="lg:hidden hover:text-gray-300 absolute right-0 px-2"
      ></Link>
      <ChatList />
    </div>
  );
}

export default Message;
