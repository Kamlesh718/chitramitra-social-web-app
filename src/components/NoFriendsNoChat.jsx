import { Link } from "react-router-dom";

function NoFriendsNoChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      <div className="text-6xl mb-4">😔</div>
      <span className="text-[#1abc9c] text-2xl font-semibold mb-2">
        You don&apos;t follow anyone yet!
      </span>
      <p className="">Start following friends to chat and share moments. 🌟</p>
      <div className="mt-6">
        <Link
          to="/explore"
          className="bg-[#1abc9c]  py-2 px-4 rounded hover:bg-[#16a085] transition duration-300"
        >
          Discover Friends
        </Link>
      </div>
    </div>
  );
}

export default NoFriendsNoChat;
