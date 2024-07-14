import { useState } from "react";
import { useAddComments } from "../hooks/posts/useAddComments";
import { useUsername } from "../hooks/profile/useUsername";
import { useUserData } from "../hooks/profile/useUserData";

function CommentBox({ postId }) {
  const { username } = useUsername();
  const { profileImage, userId } = useUserData();
  const [comment, setComment] = useState("");
  const { addComment, isAddingComment } = useAddComments(postId);
  const handleSubmit = function (e) {
    e.preventDefault();
    const formData = {
      postId,
      comment,
      username: username?.username,
      avatar: profileImage,
      userId,
    };
    addComment(formData);
    setComment("");
  };

  const handleCommentInput = function (e) {
    setComment(e.target.value);
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your comments"
        className="w-full h-16 px-3 py-2 rounded-md text-gray-700 textarea-no-resize mt-8 "
        value={comment}
        onChange={handleCommentInput}
        disabled={isAddingComment}
      ></textarea>
      <button
        className="w-1/3 bg-[#1abc9c] py-2 px-4 rounded hover:bg-[#16a085] transition duration-300"
        disabled={isAddingComment}
        onSubmit={handleSubmit}
      >
        Send
      </button>
    </form>
  );
}

export default CommentBox;
