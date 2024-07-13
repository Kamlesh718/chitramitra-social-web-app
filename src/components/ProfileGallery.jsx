import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useGetIndividualPosts } from "../hooks/posts/useGetIndividualPosts";
import { useUsername } from "../hooks/profile/useUsername";
import SmallLoader from "./SmallLoader";
import { useDeletePost } from "../hooks/posts/useDeletePost";
import ProfileNoPosts from "./ProfileNoPosts";

function ProfileGallery() {
  const { username } = useUsername();
  const { getIndividualPosts, isLoading } = useGetIndividualPosts(
    username?.username
  );
  const { deletePost, isDeletingPost } = useDeletePost();

  const handleDeletePost = function (id, oldImage) {
    const image = oldImage.split("/").at(-1);
    if (confirm("Are you sure to delete a post?")) {
      deletePost({ id, oldImage: image });
    } else {
      return null;
    }
  };

  return (
    <div className="container mx-auto mt-4 mb-12">
      <div
        className={`grid ${
          getIndividualPosts?.length === 0 ? "flex" : "grid grid-cols-3"
        }  gap-4`}
      >
        {isLoading ? (
          <SmallLoader />
        ) : getIndividualPosts?.length === 0 ? (
          <ProfileNoPosts />
        ) : (
          getIndividualPosts?.map((post) => (
            <div key={post.id} className="">
              <>
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full lg:h-64 object-cover aspect-square border-2 border-[#1abc9c]"
                />
                <div className="flex gap-1">
                  <Link to={`/profile/editpost/${post.id}`}>
                    <PencilIcon className="size-6 md:size-8 bg-[#1abc9c]  p-1 " />
                  </Link>
                  <button
                    className="p-0 m-0"
                    onClick={() => handleDeletePost(post.id, post.image)}
                    disabled={isDeletingPost}
                  >
                    <TrashIcon className="size-6 md:size-8 bg-red-500 p-1" />
                  </button>
                </div>
              </>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfileGallery;
