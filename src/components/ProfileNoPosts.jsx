import { Link } from "react-router-dom";

function ProfileNoPosts() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      <div className="text-6xl mb-4">📸</div>
      <span className="text-[#1abc9c] text-2xl font-semibold mb-2">
        You haven&apos;t posted anything yet!
      </span>
      <p className="">
        Start sharing your moments and memories with your friends. 🌟
      </p>
      <div className="mt-6">
        <Link
          to="/createpost"
          className="bg-[#1abc9c]  py-2 px-4 rounded hover:bg-[#16a085] transition duration-300"
        >
          Create Your First Post
        </Link>
      </div>
    </div>
  );
}

export default ProfileNoPosts;
