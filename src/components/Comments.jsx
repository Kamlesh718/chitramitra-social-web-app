import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useFetchComments } from "../hooks/posts/useFetchComments";
import SmallLoader from "./SmallLoader";
import { useUsername } from "../hooks/profile/useUsername";
import { useDeleteComment } from "../hooks/posts/useDeleteComment";
import { convertToIST } from "../utils/timestamp";

function Comments({ postId }) {
  const [isOpen, setOpen] = useState(false);
  const { getComments, isFetchingComments } = useFetchComments(postId);
  const { deleteComment, isDeletingComment } = useDeleteComment(postId);
  const { username } = useUsername();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const openComments = () => {
    setOpen(true);
  };

  const closeComments = () => {
    setOpen(false);
  };

  const handleDelete = function (id) {
    deleteComment(id);
  };

  return (
    <>
      <ChatBubbleOvalLeftEllipsisIcon
        className="size-8 cursor-pointer"
        onClick={openComments}
      />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50 backdrop-blur-sm  font-medium tracking-wider comment">
          <div className="p-6 rounded sm:w-1/2 lg:w-1/3">
            <div className="mt-24 ">
              <h2 className="text-lg font-bold mb-4">Comments</h2>
              {getComments.length === 0 ? (
                <span>No comments</span>
              ) : (
                <div className="max-h-[50vh] overflow-y-auto space-y-2">
                  {isFetchingComments ? (
                    <SmallLoader />
                  ) : (
                    <ul className=" flex gap-3 flex-col  justify-items-center">
                      {getComments.map((comment) => (
                        <li key={comment.id} className="flex items-center mb-2">
                          <img
                            src={comment.avatar}
                            alt={`${comment.username}'s avatar`}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <span>
                            <span className="font-semibold font-mono">
                              {`${comment.username}: `}
                            </span>
                            <span>{comment.comment}</span>
                            <div className="flex flex-col">
                              <span className="text-[12px] font-thin p-1">
                                {convertToIST(comment.created_at)}
                              </span>
                            </div>
                          </span>
                          {username?.username === comment.username ? (
                            <button
                              onClick={() => handleDelete(comment.id)}
                              disabled={isDeletingComment}
                            >
                              <TrashIcon className="size-5 text-white" />
                            </button>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <CommentBox postId={postId} />
              <button
                onClick={closeComments}
                className="bg-[#1abc9c] text-gray-800 font-bold py-2 px-4 rounded-full m-4 absolute top-0 left-0 "
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Comments;
