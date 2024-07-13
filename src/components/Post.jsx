import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import Comments from "./Comments";
import { useState, useEffect } from "react";
import SmallLoader from "./SmallLoader";
import { useUserData } from "../hooks/profile/useUserData";
import { useGetLikes } from "../hooks/posts/useGetLikes";
import { useUpdateLikes } from "../hooks/posts/useUpdateLikes";
import { useUpdatePostLikes } from "../hooks/posts/useUpdatePostLikes";
import { convertToIST } from "../utils/timestamp";
import CommentList from "./CommentList";

const Post = ({ post, isFetchingFollowedPosts, isFetchingPosts }) => {
  const { userId } = useUserData();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes_count || 0);
  const [showHeart, setShowHeart] = useState(false);
  const { likes } = useGetLikes(post?.id);
  const { updateLike } = useUpdateLikes(post?.id);
  const { updatepostlike } = useUpdatePostLikes(post?.id);

  useEffect(() => {
    if (likes && likes.length > 0) {
      setLiked(likes[0].liked); // assuming the first element contains the necessary data
    }
  }, [likes]);

  const handleLike = function () {
    setLiked((like) => !like);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);

    const likeData = {
      post_id: post.id,
      user_id: userId,
      liked: !liked,
    };
    updateLike(likeData);

    const updatedLikeCount = liked ? likeCount - 1 : likeCount + 1;
    setLikeCount(updatedLikeCount);

    updatepostlike({ postId: post.id, likeCount: updatedLikeCount });
  };

  return (
    <div className="p-4 mb-4 rounded-md place-self-center shadow-sm h-min shadow-[#1abc9c] border-2 border-[#1abc9c]">
      {/* User info section */}
      <div className="flex items-center mb-4">
        <img
          src={post.avatar}
          alt={`${post.username}'s avatar`}
          className="w-12 h-12 rounded-full mr-2"
        />
        <span className="font-semibold">{post.username}</span>
      </div>
      {/* Image section */}
      {isFetchingPosts ? (
        <SmallLoader />
      ) : (
        <img
          src={post.image}
          alt={`${post.username} Post image`}
          className={`w-full rounded-md mb-4  ${
            isFetchingFollowedPosts ? "hidden" : ""
          }`}
          onDoubleClick={handleLike}
        />
      )}
      {/* Likes and comments section */}
      <ul className="flex items-center gap-4">
        <div className="font-semibold">{likeCount} likes</div>
        {liked ? (
          <HeartIconFill
            className="w-8 h-8 cursor-pointer text-red-500"
            onClick={handleLike}
          />
        ) : (
          <HeartIcon
            className="w-8 h-8 cursor-pointer text-red-500"
            onClick={handleLike}
          />
        )}
        <Comments postId={post.id} />
      </ul>
      <p className="mb-2 mt-3">{post.caption}</p>
      <CommentList postId={post.id} />

      <p className="text-sm font-light">{convertToIST(post.created_at)}</p>
      {showHeart && (
        <HeartIconFill className="w-32 h-32 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
      )}
    </div>
  );
};

export default Post;
