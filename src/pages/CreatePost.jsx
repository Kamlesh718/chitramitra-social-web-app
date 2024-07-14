import { useState } from "react";
import Heading from "../components/Heading";
import { useAddPost } from "../hooks/posts/useAddPost";
import { useUsername } from "../hooks/profile/useUsername";
import { useUserData } from "../hooks/profile/useUserData";

const CreatePost = () => {
  const { username } = useUsername();
  const { profileImage, userId } = useUserData();
  const { addPosts, isAddingPost } = useAddPost();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      caption,
      image,
      username: username?.username,
      avatar: profileImage,
      user_id: userId,
    };
    addPosts(formData);
    setCaption("");
    setImage(null);
  };

  return (
    <div className="flex  items-center m-auto border border-[#1abc9c] h-[90vh] lg:h-full ">
      <form
        className="flex flex-col w-full px-8 pt-6 pb-8 mb-4 gap-4"
        onSubmit={handleSubmit}
      >
        <Heading>Add Post</Heading>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-[#1abc9c]
        file:mr-4 file:py-2 file:px-4 lg:w-1/3
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-gray-100 file:text-[#1abc9c]
        font-semibold cursor-pointer"
        />
        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border border-gray-500 w-full h-12 px-3 py-2 rounded-md text-gray-700 textarea-no-resize "
          disabled={isAddingPost}
        ></textarea>
        <input
          type="submit"
          value="Upload"
          disabled={isAddingPost}
          className=" w-1/3 bg-[#1abc9c] py-2 px-3  rounded-md"
        />
      </form>
    </div>
  );
};

export default CreatePost;
