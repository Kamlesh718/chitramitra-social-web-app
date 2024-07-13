import { useState, useEffect } from "react";
import SmallLoader from "./SmallLoader";
import { useFetchComments } from "../hooks/posts/useFetchComments";

const CommentList = ({ postId }) => {
  const { getComments, isFetchingComments } = useFetchComments(postId);
  const [visibleComments, setVisibleComments] = useState([]);

  useEffect(() => {
    if (getComments) {
      setVisibleComments(getComments.slice(0, 2));
    }
  }, [getComments]);

  if (isFetchingComments) {
    return <SmallLoader />;
  }

  return (
    <div className="mt-2">
      {visibleComments.map((comment) => (
        <div key={comment.id} className="flex gap-2 py-2">
          <p className="text-sm font-semibold">{comment.username}</p>
          <p className="text-sm">{comment.comment}</p>
        </div>
      ))}
      {getComments?.length === 0 ? null : "..."}
    </div>
  );
};

export default CommentList;
