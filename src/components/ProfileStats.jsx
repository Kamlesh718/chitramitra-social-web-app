import { Link } from "react-router-dom";

function ProfileStats({ followers, following, posts }) {
  return (
    <div className="p-4 flex justify-around mt-4">
      {/* <div className="text-center  flex flex-col">
        <span className="font-semibold ">{followers}</span>
        <span>Followers</span>
      </div> */}
      <Link to="following" className="text-center flex flex-col">
        <span className="font-semibold ">{following}</span>
        <span>Following</span>
      </Link>
      <Link to="posts" className="text-center  flex flex-col">
        <span className="font-semibold ">{posts}</span>
        <span>Posts</span>
      </Link>
    </div>
  );
}

export default ProfileStats;
