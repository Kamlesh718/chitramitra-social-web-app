import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useGetSinglePostData } from "../hooks/posts/useGetSinglePostData";
import { useParams } from "react-router-dom";
import { useUpdatePostCaption } from "../hooks/posts/useUpdatePostCaption";
import { useUpdatePostImage } from "../hooks/profile/useUpdatePostImage";
import { HeartIcon } from "@heroicons/react/24/solid";

function EditPost() {
  const { postid } = useParams();
  const { getSinglePostData } = useGetSinglePostData(postid);
  const { updateCaption, isUpdatingCaption } = useUpdatePostCaption();
  const { updateImage, isUpdatingImage } = useUpdatePostImage();
  const [postImage, setPostImage] = useState("");
  const [oldPostImage, setOldPostImage] = useState("");
  const [caption, setCaption] = useState("");
  const [likeNo, setLikesNo] = useState(0);

  useEffect(() => {
    if (getSinglePostData) {
      setCaption(getSinglePostData.caption);
      setOldPostImage(getSinglePostData.image);
      setLikesNo(getSinglePostData?.likes_count);
    }
  }, [getSinglePostData]);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    const oldImage = oldPostImage.split("/").at(-1);

    const formData = {
      id: postid,
      image: postImage,
      oldImage,
    };
    updateImage(formData);
  };
  const handleCaptionSubmit = (e) => {
    e.preventDefault();
    const formData = {
      caption,
      id: postid,
    };
    updateCaption(formData);
  };

  return (
    <div className="p-4 rounded-lg max-w-md mx-auto mt-8 mb-12">
      <Heading>Edit Post</Heading>
      <span className="flex gap-2">
        <HeartIcon className="size-6 md:size-8 bg-red-500 p-1" />
        <p className="font-semibold">{likeNo}</p>
      </span>

      <form onSubmit={handleImageSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="profileImage">
            Post Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostImage(e.target.files[0])}
            className="block w-full text-sm text-[#1abc9c]
              file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-100 file:text-[#1abc9c]
              font-semibold cursor-pointer"
            disabled={isUpdatingImage}
          />
          {postImage && (
            <img
              src={postImage}
              alt="Post image"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>
        <input
          type="submit"
          value="Update Image"
          className=" sm:w-1/3 bg-[#1abc9c] py-2 px-3 rounded-md"
        />
      </form>

      <form onSubmit={handleCaptionSubmit} className="mt-6">
        <div className="mb-4">
          <label className="block mb-2" htmlFor="caption">
            Caption
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            placeholder="Enter caption"
            onChange={(e) => setCaption(e.target.value)}
            className="border border-gray-500 w-full h-12 px-3 py-2 rounded-md text-gray-700 textarea-no-resize"
          />
        </div>
        <input
          type="submit"
          value="Update Caption"
          className="sm:w-1/3 bg-[#1abc9c] py-2 px-3 rounded-md"
          disabled={isUpdatingCaption}
        />
      </form>
    </div>
  );
}

export default EditPost;
